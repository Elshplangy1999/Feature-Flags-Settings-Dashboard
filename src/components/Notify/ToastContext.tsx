"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ToastType } from "@/types/notify/toast";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import InfoNotification from "./InfoNotification";
import { Toast, ToastContextType } from "@/interfaces/Notify/Toast";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, title: string, message: string) => {
    const newToast: Toast = { id: Date.now(), type, title, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 4s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render toasts */}
      <div className="fixed right-5 top-5 z-50 flex flex-col gap-3">
        {toasts.map((toast) =>
          toast.type === "success" ? (
            <SuccessNotification
              key={toast.id}
              title={toast.title}
              message={toast.message}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          ) : toast.type === "error" ? (
            <ErrorNotification
              key={toast.id}
              title={toast.title}
              message={toast.message}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          ) : toast.type === "info" ? (
            <InfoNotification
              key={toast.id}
              title={toast.title}
              message={toast.message}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          ) : null,
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
