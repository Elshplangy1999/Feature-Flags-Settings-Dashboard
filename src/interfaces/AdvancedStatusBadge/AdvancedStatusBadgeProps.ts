export interface AdvancedStatusBadgeProps {
  status: string;
  variant?:
    | "default"
    | "glow"
    | "gradient"
    | "glass"
    | "minimal"
    | "neon"
    | "pulse";
  size?: "xs" | "sm" | "md" | "lg";
  animated?: boolean;
  showIcon?: boolean;
}
