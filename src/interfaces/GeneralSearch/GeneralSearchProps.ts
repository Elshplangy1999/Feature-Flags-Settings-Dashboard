export interface GeneralSearchProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  enableModal?: boolean;
  onModalOpen?: () => void;
  placeholder?: string;
  className?: string;
  customWidth?: string;
  isHeader?: boolean;
  customClassName?: string;
  onBackendSearch?: (searchTerm: string) => Promise<void> | void;
  backendSearchLoading?: boolean;
  onResetBackendSearch?: () => void;
}
