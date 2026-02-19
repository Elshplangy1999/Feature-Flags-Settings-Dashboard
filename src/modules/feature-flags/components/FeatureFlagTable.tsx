"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { FeatureFlagTableProps, FeatureFlag } from "../interfaces/featureFlags";
import { getFeatureFlagColumns } from "../constants/getFeatureFlagColumns";
import AdvancedStatusBadge from "@/components/AdvancedStatusBadge/AdvancedStatusBadge";
import GeneralTable from "@/components/Tables/GeneralTable";
import {
  RowData,
  CustomAction,
} from "@/interfaces/GeneralTable/GeneralTableProps";
import { SwitchStateIcon } from "@/Icons/SwitchStateIcon";
import SmallLoader from "@/components/SmallLoader/SmallLoader";

const FeatureFlagTable: React.FC<FeatureFlagTableProps> = ({
  flags,
  onToggle,
}) => {
  const { t } = useTranslation();
  const columns = getFeatureFlagColumns(t);

  /**
   * --------------------------------------------------
   *  Variables & State
   * --------------------------------------------------
   */
  const [togglingIds, setTogglingIds] = useState<Set<string | number>>(
    new Set(),
  );

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const getEnvironmentBadge = (environment: string): React.CSSProperties => {
    const styles: Record<string, React.CSSProperties> = {
      development: { backgroundColor: "#FFFBEB", color: "#D97706" },
      staging: { backgroundColor: "#E1E8FF", color: "#1C3FB7" },
      production: { backgroundColor: "#E9FBF0", color: "#1A8245" },
    };
    return styles[environment] ?? styles["development"];
  };

  const handleToggle = async (flag: FeatureFlag) => {
    if (togglingIds.has(flag.id)) return; // prevent double-click

    setTogglingIds((prev) => new Set(prev).add(flag.id));
    try {
      onToggle(flag);
    } finally {
      setTimeout(() => {
        setTogglingIds((prev) => {
          const next = new Set(prev);
          next.delete(flag.id);
          return next;
        });
      }, 400);
    }
  };

  const renderRow = (flag: FeatureFlag): RowData[] => [
    { value: flag.name },
    {
      element: (
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
          style={getEnvironmentBadge(flag.environment)}
        >
          {t(flag.environment)}
        </span>
      ),
    },
    {
      // FIX 4: Show spinner while toggling, badge otherwise
      element: togglingIds.has(flag.id) ? (
        <SmallLoader />
      ) : (
        <AdvancedStatusBadge
          status={flag.status === "enabled" ? "active" : "inactive"}
          variant="glow"
        />
      ),
    },
    { value: new Date(flag.created_at).toLocaleDateString() },
  ];

  const customActions: CustomAction<FeatureFlag>[] = [
    {
      icon: <SwitchStateIcon />,
      onClick: handleToggle,
      title: t("Toggle Status"),
      className: (item: FeatureFlag) =>
        togglingIds.has(item.id)
          ? "cursor-not-allowed opacity-50"
          : "hover:text-primary",
    },
  ];

  return (
    <GeneralTable<FeatureFlag>
      data={flags}
      columns={columns}
      renderRow={renderRow}
      customActions={customActions}
      enableSort={true}
      getItemId={(flag) => flag.id}
    />
  );
};

export default FeatureFlagTable;
