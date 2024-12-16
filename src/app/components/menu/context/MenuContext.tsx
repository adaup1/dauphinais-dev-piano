"use client";

import { createContext, useState, useContext } from "react";
import { MenuContextProps } from "./types.d";

export const MenuContext = createContext<MenuContextProps>({
  audioOn: false,
  setAudioOn: function (audioOn: boolean): void {
    throw new Error("Function not implemented.");
  },
});

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audioOn, setAudioOn] = useState(false);

  return (
    <MenuContext.Provider value={{ audioOn, setAudioOn }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(MenuContext);
};
