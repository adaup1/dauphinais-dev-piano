"use client";

import { createContext, useState, useContext } from "react";
import { MenuContextProps } from "./types.d";

export const MenuContext = createContext<MenuContextProps>({
  audioOn: false,
  audioContext: null,
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
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const handleSetAudioOn = (newAudioOn: boolean) => {
    if (newAudioOn) {
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      context.resume();
      setAudioContext(context);
    } else {
      audioContext?.suspend();
    }
    setAudioOn(newAudioOn);
  };

  return (
    <MenuContext.Provider
      value={{ audioOn, audioContext, setAudioOn: handleSetAudioOn }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(MenuContext);
};
