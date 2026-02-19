"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/components/Notify/ToastContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </LanguageProvider>
    </Provider>
  );
}
