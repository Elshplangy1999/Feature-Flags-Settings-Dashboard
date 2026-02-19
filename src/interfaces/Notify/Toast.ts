import { ToastType } from "@/types/notify/toast";

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

export interface ToastContextType {
  showToast: (type: ToastType, title: string, message: string) => void;
}
