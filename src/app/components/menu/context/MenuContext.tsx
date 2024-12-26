"use client";

import { createContext, useState, useContext, useCallback } from "react";
import { MenuContextProps } from "./types.d";
import { useAudioManager } from "../keys/hooks/useAudioManager";

export const MenuContext = createContext<MenuContextProps>({
  audioOn: false,
  isInitialized: false,
  setAudioOn: () => {
    throw new Error("Function not implemented.");
  },
});

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audioOn, setAudioOn] = useState(false);
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
        setAudioOn: handleSetAudioOn,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(MenuContext);
};
