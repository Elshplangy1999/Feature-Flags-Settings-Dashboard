import { LucideIcon } from "lucide-react";

export interface GeneralButtonProps {
  onClick: () => void;
  Icon?: LucideIcon;
  className?: string;
  size?: number;
  ariaLabel?: string;
}