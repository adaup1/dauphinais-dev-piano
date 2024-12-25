"use client";

import { useState, useCallback, useEffect } from "react";
import { styled } from "next-yak";
import { theme } from "../../../../theme/theme";
import { kodchasan } from "../../../../theme/fonts";
import Link from "next/link";
import { MusicNote } from "../MusicNote";
import { usePathname } from "next/navigation";
import get from "lodash/get";
import { clipPathMap } from "./clipPathMap";
import { useMenuContext } from "../../context";
import { sampleMap } from "../sampleMap";
import { note } from "@/app/types.d";

interface WhiteKeyProps {
  name: string;
  href: string;
  note: note;
  hideTopGradient?: boolean;
  hideBottomGradient?: boolean;
}

const FADE_IN_TIME = 0.015;
const FADE_OUT_TIME = 0.3;

export const WhiteKey = ({
  name = "",
  href = "/",
  note = "B",
  hideTopGradient = false,
  hideBottomGradient = false,
}: WhiteKeyProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
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
          // Start at 0 and ramp up
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
    <StyledLink href={href}>
      <StyledContainer
        note={note}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        hideTopGradient={hideTopGradient}
        hideBottomGradient={hideBottomGradient}
      >
        <StyledGradientOverlay />
        <StyledLinkText isActive={isActive}>{name}</StyledLinkText>
        {isHovered && <MusicNote x={mousePos.x} y={mousePos.y} />}
      </StyledContainer>
    </StyledLink>
  );
};

interface StyledContainerProps {
  note: note;
  hideTopGradient?: boolean;
  hideBottomGradient?: boolean;
}

const StyledGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  transition: opacity 180ms ease;
  opacity: 0;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, ${theme.white} 20%, #bdbdbd22 100%);
    z-index: 5;
    opacity: 0;
    transition: opacity 180ms ease;
  }
`;

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 5rem;
  position: relative;
  background: ${theme.white};
  clip-path: ${({ note }) => get(clipPathMap, [note, "default"], "none")};
  transition: clip-path 180ms ease;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ hideTopGradient, hideBottomGradient }) => {
      if (hideBottomGradient) {
        return `linear-gradient(0deg, ${theme.white} 0%, ${theme.white} 82%, ${theme.silver} 100%)`;
      }
      if (hideTopGradient) {
        return `linear-gradient(0deg, ${theme.silver} 0%,  18%,  100%)`;
      }
      return `linear-gradient(0deg, ${theme.silver} 0%, ${theme.white} 18%, ${theme.white} 82%, ${theme.silver} 100%)`;
    }};
    opacity: 0;
    transition: opacity 180ms ease;
    z-index: 1;
  }

  &:hover {
    &::before {
      opacity: 1;
    }

    ${StyledGradientOverlay} {
      opacity: 1;

      &::before {
        opacity: 1;
      }
    }

    clip-path: ${({ note }) => get(clipPathMap, [note, "hover"], "none")};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface StyledLinkTextProps {
  isActive: boolean;
}

const StyledLinkText = styled.div<StyledLinkTextProps>`
  color: ${({ isActive }) => (isActive ? theme.silver : theme.darkBlue)};
  z-index: 10;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-family: ${() => kodchasan.style.fontFamily};
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  font-size: 1.25rem;
`;
