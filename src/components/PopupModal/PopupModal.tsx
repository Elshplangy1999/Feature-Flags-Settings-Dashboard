import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { PopupModalProps } from "@/interfaces/PopupModal/PopupModalProps";
import GeneralButton from "./GeneralButton";

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  isClose = true,
  onClose,
  title,
  icon: Icon,
  children,
  className = "max-w-md",
}) => {
  const { t } = useTranslation();

  /**
   * --------------------------------------------------
   *  Conditional Rendering
   * --------------------------------------------------
   */
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
      <div
        className={`w-full ${className} animate-in zoom-in-95 slide-in-from-bottom-4 max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-white/95 p-0 shadow-2xl backdrop-blur-xl duration-300 dark:border-gray-700/50 dark:bg-gray-900/95`}
      >
        {/* Header */}
        <div className="relative rounded-t-2xl border-b border-white/20 bg-linear-to-r from-blue-50 to-indigo-50 p-6 dark:border-gray-700/50 dark:from-blue-950/50 dark:to-indigo-950/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="rounded-xl bg-blue-100 p-2 dark:bg-blue-900/50">
                  <Icon className="dark:text-primary-400 h-5 w-5 text-primary" />
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t(title)}
              </h3>
            </div>
            {isClose && <GeneralButton onClick={onClose} Icon={X} />}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 xsm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default PopupModal;
