"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RotateCcw, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  environmentOptions,
  statusOptions,
} from "../constants/environmentOptions";
import "../../../css/style.css";
import {
  FeatureFlagFilterModalProps,
  FeatureFlagFilters,
} from "../interfaces/featureFlags";

const FeatureFlagFilterModal: React.FC<FeatureFlagFilterModalProps> = ({
  onApplyFilter,
  currentFilters,
  onClose,
}) => {
  const { t } = useTranslation();

  /**
   * --------------------------------------------------
   *  Variables & State
   * --------------------------------------------------
   */
  const [isAnimating, setIsAnimating] = useState(false);

  const initialValues: FeatureFlagFilters = {
    environment: currentFilters?.environment || "",
    status: currentFilters?.status || "",
  };

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const handleSubmit = (values: FeatureFlagFilters) => {
    setIsAnimating(true);

    setTimeout(() => {
      onApplyFilter(values);
      setIsAnimating(false);
      onClose();
    }, 200);
  };

  const handleReset = (
    resetForm: FormikHelpers<FeatureFlagFilters>["resetForm"],
  ) => {
    const resetValues: FeatureFlagFilters = {
      environment: "",
      status: "",
    };

    resetForm({ values: resetValues });
    onApplyFilter(resetValues);
    onClose();
  };

  const hasActiveFilters = (values: FeatureFlagFilters) => {
    return values.environment !== "" || values.status !== "";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Formik<FeatureFlagFilters>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ resetForm, submitForm, values, handleChange, isValid }) => (
          <Form className="space-y-8">
            {/* Environment Dropdown */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Environment")}
              </label>
              <select
                name="environment"
                value={values.environment}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">{t("Select Environment")}</option>
                {environmentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {t(opt.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Status")}
              </label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">{t("Select Status")}</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {t(opt.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200/50 pt-6 dark:border-gray-700/50 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => handleReset(resetForm)}
                disabled={!hasActiveFilters(values)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800/50 sm:w-auto"
              >
                <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                {t("Reset")}
              </button>

              <button
                type="button"
                onClick={submitForm}
                disabled={isAnimating || !isValid}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
              >
                {isAnimating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Check className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                )}
                {t("Apply Filters")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeatureFlagFilterModal;
