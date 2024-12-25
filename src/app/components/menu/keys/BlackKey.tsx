"use client";

import { styled } from "next-yak";
import { useState, useCallback, useEffect } from "react";
import { MusicNote } from "./MusicNote";
import { useMenuContext } from "../context";
import { sampleMap } from "./sampleMap";
import { note } from "@/app/types.d";

interface BlackKeyProps {
  note: note;
}

const FADE_IN_TIME = 0.015;
const FADE_OUT_TIME = 0.3;

export const BlackKey = ({ note = "Bb" }: BlackKeyProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { audioOn, audioContext, tunaReverb } = useMenuContext();
  const [sample, setSample] = useState<HTMLAudioElement | null>(null);
  const [audioSource, setAudioSource] =
    useState<MediaElementAudioSourceNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovered(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      if (audioOn && audioContext && tunaReverb) {
        if (!sample) {
          const audio = new Audio(sampleMap[note]);
          audio.volume = 0.7;
          setSample(audio);

          const gain = audioContext.createGain();
          gain.gain.setValueAtTime(0, audioContext.currentTime);
          gain.gain.linearRampToValueAtTime(
            0.7,
            audioContext.currentTime + FADE_IN_TIME
          );
          setGainNode(gain);

          const source = audioContext.createMediaElementSource(audio);
          source.connect(gain);
          gain.connect(tunaReverb);
          tunaReverb.connect(audioContext.destination);
          setAudioSource(source);

          audio.play();
        } else {
          sample.currentTime = 0;
          if (gainNode) {
            const now = audioContext.currentTime;
            gainNode.gain.cancelScheduledValues(now);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.7, now + FADE_IN_TIME);
          }
          sample.play();
        }
      }
    },
    [audioOn, audioContext, tunaReverb, note, sample, gainNode]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (gainNode && audioContext && sample) {
      const now = audioContext.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, now + FADE_OUT_TIME);

      // Stop the sample after fade out
      setTimeout(() => {
        sample.pause();
        // Reset gain for next play
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      }, FADE_OUT_TIME * 1000 + 10); // Adjusted timeout to match longer fade
    }
  }, [gainNode, audioContext, sample]);

  useEffect(() => {
    return () => {
      if (gainNode) {
        gainNode.disconnect();
      }
      if (audioSource) {
        audioSource.disconnect();
      }
    };
  }, [gainNode, audioSource]);

  return (
    <StyledContainer
      note={note}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledOverlayLong />
      <StyledOverlayShort />
      {isHovered && <MusicNote x={mousePos.x} y={mousePos.y} />}
    </StyledContainer>
  );
};

interface StyledContainerProps {
  note: note;
}

const StyledOverlayLong = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
  background-color: black;
  clip-path: polygon(0 0, 92% 12%, 92% 88%, 0% 100%);
  transition: clip-path 120ms ease;
`;

const StyledOverlayShort = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
  background: linear-gradient(90deg, rgba(7, 20, 14, 1) 88%, #2b2b2b 100%);
  clip-path: polygon(92% 12%, 100% 0, 100% 100%, 92% 88%);
  transition: all 120ms ease;
`;

const StyledTopGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  transition: opacity 120ms ease;
  opacity: 0;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(50, 50, 50, 0.8) 100%
    );
    z-index: 10;
    opacity: 0;
    transition: opacity 120ms ease;
  }
`;

const StyledContainer = styled.div<StyledContainerProps>`
  /* width: calc(100% - 15rem);
  max-width: 50%; */
  width: 40%;
  height: 2.92rem;
  background-color: #5a5a5a;
  transition: background-color 120ms ease;
  z-index: 8;
  position: absolute;
  top: ${({ note }) => {
    switch (note) {
      case "Bb":
        return "2.92rem";
      case "Gb":
        return "14.48rem";
      case "Ab":
        return "8.76rem";
      case "Gb":
        return "14.6rem";
      default:
        throw new Error("Invalid note");
    }
  }};

  &:hover {
    clip-path: polygon(0 0, 100% 2%, 100% 98%, 0% 100%);
    background-color: #505050;

    ${StyledTopGradient} {
      opacity: 1;

      &::before {
        opacity: 1;
      }
    }

    & ${StyledOverlayLong} {
      clip-path: polygon(0 0, 100% 12%, 100% 88%, 0% 100%);
    }

    & ${StyledOverlayShort} {
      clip-path: polygon(95% 12%, 100% 0, 100% 100%, 95% 88%);
      background: linear-gradient(90deg, rgba(7, 20, 14, 1) 91%, #323232 100%);
    }
  }
`;
