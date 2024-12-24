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

export const BlackKey = ({ note = "Bb" }: BlackKeyProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { audioOn, audioContext } = useMenuContext();
  const [sample, setSample] = useState<HTMLAudioElement | null>(null);
  const [audioSource, setAudioSource] =
    useState<MediaElementAudioSourceNode | null>(null);
  const [fadeOutState, setFadeOutState] = useState<{
    isActive: boolean;
    startTime: number;
  }>({ isActive: false, startTime: 0 });

  useEffect(() => {
    if (!fadeOutState.isActive || !sample) return;

    let currentVolume = sample.volume;
    const fadeOutInterval = setInterval(() => {
      currentVolume = Math.max(0, currentVolume - 0.1);
      sample.volume = currentVolume;

      if (currentVolume <= 0) {
        clearInterval(fadeOutInterval);
        sample.pause();
        setFadeOutState({ isActive: false, startTime: 0 });
      }
    }, 30);

    return () => {
      clearInterval(fadeOutInterval);
    };
  }, [fadeOutState.isActive, sample]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovered(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      if (audioOn && audioContext) {
        if (!sample) {
          const audio = new Audio(sampleMap[note]);
          setSample(audio);

          const source = audioContext.createMediaElementSource(audio);
          source.connect(audioContext.destination);
          setAudioSource(source);

          audio.play();
        } else {
          sample.currentTime = 0;
          sample.volume = 1;
          sample.play();
        }
      }
    },
    [audioOn, audioContext, note, sample]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (sample) {
      const fadeOutStart = Date.now();
      setFadeOutState({ isActive: true, startTime: fadeOutStart });
    }
  }, [sample]);

  useEffect(() => {
    return () => {
      if (audioSource) {
        audioSource.disconnect();
      }
    };
  }, [audioSource]);

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
