export interface HandleReducerProps {
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
  message?: string;
  className?: string;
}
