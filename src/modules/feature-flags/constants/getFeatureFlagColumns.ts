import { Column } from "@/interfaces/GeneralTable/DynamicColumnsProps";

export const getFeatureFlagColumns = (t: (key: string) => string): Column[] => [
  { key: "name", label: t("Name"), sortable: true },
  { key: "environment", label: t("Environment"), sortable: true },
  { key: "status", label: t("Status"), sortable: true },
  { key: "created_at", label: t("Created Date"), sortable: true },
];