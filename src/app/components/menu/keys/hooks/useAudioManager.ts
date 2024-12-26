import { useState, useEffect, useCallback, useRef } from "react";
import { sampleMap } from "../sampleMap";
import { note } from "../../../../types.d";
import Tuna from "tunajs";

interface AudioNodes {
  source: MediaElementAudioSourceNode;
  gain: GainNode;
  audio: HTMLAudioElement;
}

export const useAudioManager = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const reverbRef = useRef<any>(null);
  const audioNodesRef = useRef<Record<note, AudioNodes>>(
    {} as Record<note, AudioNodes>
  );
  const scheduledStopsRef = useRef<Record<note, number>>(
    {} as Record<note, number>
  );

  // Initialize audio context and effects
  const initializeAudio = useCallback(async () => {
    if (isInitialized) return;

    try {
      // Create audio context
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = context;

      // Create Tuna and reverb
      const tuna = new Tuna(context);
      const reverb = new tuna.Convolver({
        highCut: 22050,
        lowCut: 20,
        dryLevel: 0.4,
        wetLevel: 0.6,
        level: 0.5,
        impulse: "samples/reverb.wav",
        bypass: false,
      });
      reverbRef.current = reverb;

      // Pre-load all samples
      const loadPromises = Object.entries(sampleMap).map(
        async ([noteKey, samplePath]) => {
          const audio = new Audio();
          audio.src = samplePath;

          // Create nodes
          const source = context.createMediaElementSource(audio);
          const gain = context.createGain();
          gain.gain.setValueAtTime(0, context.currentTime);

          // Connect nodes
          source.connect(gain);
          gain.connect(reverb);
          reverb.connect(context.destination);

          // Store nodes
          audioNodesRef.current[noteKey as note] = {
            source,
            gain,
            audio,
          };

          // Wait for audio to load
          return new Promise((resolve) => {
            audio.addEventListener("canplaythrough", resolve, { once: true });
          });
        }
      );

      // Wait for all samples to load
      await Promise.all(loadPromises);
      await context.resume();
      setIsInitialized(true);
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }, [isInitialized]);

  const cleanup = useCallback(() => {
    if (!audioContextRef.current) return;

    // Cancel all scheduled stops
    Object.values(scheduledStopsRef.current).forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });

    // Disconnect and clean up all nodes
    Object.values(audioNodesRef.current).forEach(({ source, gain, audio }) => {
      audio.pause();
      audio.currentTime = 0;
      source.disconnect();
      gain.disconnect();
    });

    // Reset state
    audioNodesRef.current = {} as Record<note, AudioNodes>;
    scheduledStopsRef.current = {} as Record<note, number>;
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const playNote = useCallback(
    async (noteKey: note, fadeInTime: number = 0.015) => {
      if (!isInitialized || !audioContextRef.current) {
        await initializeAudio();
      }

      const nodes = audioNodesRef.current[noteKey];
      if (!nodes) return;

      const { gain, audio } = nodes;
      const context = audioContextRef.current;
      if (!context) return;

      // Clear any scheduled stop for this note
      if (scheduledStopsRef.current[noteKey]) {
        clearTimeout(scheduledStopsRef.current[noteKey]);
        delete scheduledStopsRef.current[noteKey];
      }

      // Reset audio and play
      audio.currentTime = 0;
      const now = context.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.7, now + fadeInTime);

      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    },
    [isInitialized, initializeAudio]
  );

  const stopNote = useCallback(
    (noteKey: note, fadeOutTime: number = 0.3) => {
      if (!isInitialized || !audioContextRef.current) return;

      const nodes = audioNodesRef.current[noteKey];
      if (!nodes) return;

      const { gain, audio } = nodes;
      const context = audioContextRef.current;

      const now = context.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + fadeOutTime);

      // Schedule the stop
      const timeoutId = window.setTimeout(() => {
        audio.pause();
        gain.gain.setValueAtTime(0, context.currentTime);
        delete scheduledStopsRef.current[noteKey];
      }, fadeOutTime * 1000 + 10);

      scheduledStopsRef.current[noteKey] = timeoutId;
    },
    [isInitialized]
  );

  return {
    isInitialized,
    initializeAudio,
    playNote,
    stopNote,
    cleanup,
  };
};
