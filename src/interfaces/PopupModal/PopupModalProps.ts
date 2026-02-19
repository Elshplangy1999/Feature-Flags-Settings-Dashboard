import { LucideIcon } from "lucide-react";

export interface PopupModalProps {
  isOpen: boolean;
  isClose?: boolean;
  onClose: () => void;
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}
