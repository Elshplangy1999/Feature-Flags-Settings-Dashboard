export interface ClickOutsideProps {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
  className?: string;
}
