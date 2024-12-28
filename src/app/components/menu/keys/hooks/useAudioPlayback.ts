"use client";

import { useCallback, useState } from "react";
import { sampleMap } from "../sampleMap";
import { note } from "@/app/types.d";

export const useAudioPlayback = ({
  note,
  audioOn,
}: {
  note: note;
  audioOn: boolean;
}) => {
  const [sample, setSample] = useState<HTMLAudioElement | null>(null);

  const playSample = useCallback(() => {
    if (audioOn) {
      if (!sample) {
        const audio = new Audio(sampleMap[note]);
        setSample(audio);
        audio.play();
      } else {
        sample.currentTime = 0;
        sample.volume = 1;
        sample.play();
      }
    }
  }, [sample, audioOn, note]);

  const stopSample = useCallback(() => {
    if (audioOn) {
      if (sample) {
        sample.pause();
      }
    }
  }, [sample, audioOn]);

  return { playSample, stopSample };
};
