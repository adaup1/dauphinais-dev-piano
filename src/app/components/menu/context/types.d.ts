export interface MenuContextProps {
  audioOn: boolean;
  isInitialized: boolean;
  isMobileMenuOpen: boolean;
  setAudioOn: (audioOn: boolean) => void;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
}
