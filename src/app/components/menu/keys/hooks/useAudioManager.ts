import { useState, useEffect, useCallback, useRef } from "react";
import { sampleMap } from "../sampleMap";
import { note } from "../../../../types.d";
import Tuna from "tunajs";

interface AudioNodes {
  source: MediaElementAudioSourceNode;
  gain: GainNode;
  audio: HTMLAudioElement;
  compressor: DynamicsCompressorNode;
}

export const useAudioManager = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const reverbRef = useRef<unknown>(null);
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
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      audioContextRef.current = context;

      // Create Tuna and reverb
      const tuna = new Tuna(context);
      const reverb = new tuna.Convolver({
        highCut: 16000,
        lowCut: 80,
        dryLevel: 0.2,
        wetLevel: 0.8,
        level: 0.3,
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

          // Create compressor
          const compressor = context.createDynamicsCompressor();
          compressor.threshold.setValueAtTime(-24, context.currentTime);
          compressor.knee.setValueAtTime(12, context.currentTime);
          compressor.ratio.setValueAtTime(4, context.currentTime);
          compressor.attack.setValueAtTime(0.003, context.currentTime);
          compressor.release.setValueAtTime(0.25, context.currentTime);

          // Connect nodes
          source.connect(gain);
          gain.connect(compressor);
          compressor.connect(reverb);
          reverb.connect(context.destination);

          // Store nodes
          audioNodesRef.current[noteKey as note] = {
            source,
            gain,
            audio,
            compressor,
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
      gain.gain.linearRampToValueAtTime(0.5, now + fadeInTime);

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
      const fadeEndTime = now + fadeOutTime;

      // Schedule the fade out
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, fadeEndTime);

      // Calculate precise timeout based on AudioContext time
      const msUntilFadeComplete = (fadeEndTime - now) * 1000;

      // Schedule the stop to occur exactly when fade completes
      const timeoutId = window.setTimeout(() => {
        // Double check that we're actually at zero before stopping
        if (gain.gain.value <= 0.01) {
          audio.pause();
          gain.gain.setValueAtTime(0, context.currentTime);
        }
        delete scheduledStopsRef.current[noteKey];
      }, msUntilFadeComplete + 20); // Small buffer for safety

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
