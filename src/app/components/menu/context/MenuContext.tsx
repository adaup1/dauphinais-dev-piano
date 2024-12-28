"use client";

import { createContext, useState, useContext, useCallback } from "react";
import { MenuContextProps } from "./types.d";
import { useAudioManager } from "../keys/hooks/useAudioManager";

export const MenuContext = createContext<MenuContextProps>({
  audioOn: false,
  isInitialized: false,
  isMobileMenuOpen: false,
  setAudioOn: () => {
    throw new Error("Function not implemented.");
  },
  setIsMobileMenuOpen: () => {
    throw new Error("Function not implemented.");
  },
});

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audioOn, setAudioOn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isInitialized, initializeAudio, cleanup } = useAudioManager();

  const handleSetAudioOn = useCallback(
    (newAudioOn: boolean) => {
      if (newAudioOn) {
        initializeAudio();
      } else {
        cleanup();
      }
      setAudioOn(newAudioOn);
    },
    [initializeAudio, cleanup]
  );

  return (
    <MenuContext.Provider
      value={{
        audioOn,
        isInitialized,
        isMobileMenuOpen,
        setAudioOn: handleSetAudioOn,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(MenuContext);
};
