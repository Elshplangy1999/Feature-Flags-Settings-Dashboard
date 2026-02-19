export interface InfoNotificationProps {
  type?: "info" | "success" | "error" | "update";
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
}
