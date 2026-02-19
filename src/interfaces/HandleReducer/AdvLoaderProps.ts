export interface AdvLoaderProps {
  message?: string;
  className?: string;
  variant?: "default" | "glow" | "pulse" | "spinner";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "yellow" | "purple";
  speed?: "slow" | "normal" | "fast";
}