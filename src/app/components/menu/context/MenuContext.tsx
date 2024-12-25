"use client";

import { createContext, useState, useContext } from "react";
import { MenuContextProps } from "./types.d";
import Tuna from "tunajs";

export const MenuContext = createContext<MenuContextProps>({
  audioOn: false,
  audioContext: null,
  tunaReverb: null,
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
  const [tunaReverb, setTunaReverb] = useState<any>(null);

  const handleSetAudioOn = (newAudioOn: boolean) => {
    if (newAudioOn) {
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const tuna = new Tuna(context);

      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 2048;

      const reverb = new tuna.Convolver({
        highCut: 22050,
        lowCut: 20,
        dryLevel: 0.4,
        wetLevel: 0.6,
        level: 0.5,
        impulse: "samples/reverb.wav",
        bypass: false,
      });

      context.resume();
      setAudioContext(context);
      setTunaReverb(reverb);
    } else {
      audioContext?.suspend();
    }
    setAudioOn(newAudioOn);
  };

  return (
    <MenuContext.Provider
      value={{
        audioOn,
        audioContext,
        tunaReverb,
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
