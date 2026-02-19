export interface SidebarToggleButtonProps {
  isOpen?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "absolute" | "relative";
  visibility?: "all" | "mobile";
}