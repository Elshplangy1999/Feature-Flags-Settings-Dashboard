export interface HeaderProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (open: boolean) => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'expanded';
}