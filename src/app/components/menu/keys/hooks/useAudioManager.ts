import { useState, useEffect, useCallback } from "react";
import { sampleMap } from "../sampleMap";
import { note } from "../../../../types.d";

interface AudioNodes {
  source: MediaElementAudioSourceNode;
  gain: GainNode;
}

export const useAudioManager = (
  audioContext: AudioContext | null,
  tunaReverb: any
) => {
  const [audioSamples, setAudioSamples] = useState<
    Record<note, HTMLAudioElement>
  >({} as Record<note, HTMLAudioElement>);
  const [audioNodes, setAudioNodes] = useState<Record<note, AudioNodes>>(
    {} as Record<note, AudioNodes>
  );

  // Pre-load all samples and create audio nodes
  useEffect(() => {
    if (!audioContext || !tunaReverb) return;

    const samples: Record<note, HTMLAudioElement> = {} as Record<
      note,
      HTMLAudioElement
    >;
    const nodes: Record<note, AudioNodes> = {} as Record<note, AudioNodes>;

    Object.entries(sampleMap).forEach(([noteKey, samplePath]) => {
      const audio = new Audio(samplePath);
      audio.volume = 0.7;
      samples[noteKey as note] = audio;

      const gain = audioContext.createGain();
      gain.gain.setValueAtTime(0, audioContext.currentTime);

      const source = audioContext.createMediaElementSource(audio);
      source.connect(gain);
      gain.connect(tunaReverb);
      tunaReverb.connect(audioContext.destination);

      nodes[noteKey as note] = { source, gain };
    });

    setAudioSamples(samples);
    setAudioNodes(nodes);

    return () => {
      Object.values(nodes).forEach(({ source, gain }) => {
        source.disconnect();
        gain.disconnect();
      });
    };
  }, [audioContext, tunaReverb]);

  const playNote = useCallback(
    (note: note, fadeInTime: number = 0.015) => {
      if (!audioContext || !audioSamples[note] || !audioNodes[note]) return;

      const { gain } = audioNodes[note];
      const sample = audioSamples[note];

      sample.currentTime = 0;
      const now = audioContext.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.7, now + fadeInTime);
      sample.play();
    },
    [audioContext, audioSamples, audioNodes]
  );

  const stopNote = useCallback(
    (note: note, fadeOutTime: number = 0.3) => {
      if (!audioContext || !audioSamples[note] || !audioNodes[note]) return;

      const { gain } = audioNodes[note];
      const sample = audioSamples[note];

      const now = audioContext.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + fadeOutTime);

      setTimeout(() => {
        sample.pause();
        gain.gain.setValueAtTime(0, audioContext.currentTime);
      }, fadeOutTime * 1000 + 10);
    },
    [audioContext, audioSamples, audioNodes]
  );

  return { playNote, stopNote };
};
