"use client";

import { useState, useCallback } from "react";
import { styled } from "next-yak";
import { theme } from "../../../../theme/theme";
import { kodchasan } from "../../../../theme/fonts";
import Link from "next/link";
import { MusicNote } from "../MusicNote";
import { usePathname } from "next/navigation";
import get from "lodash/get";
import { clipPathMap } from "./clipPathMap";
import { useMenuContext } from "../../context";
import { note } from "@/app/types.d";
import { useAudioManager } from "../hooks/useAudioManager";

interface WhiteKeyProps {
  name: string;
  href: string;
  note: note;
  hideTopGradient?: boolean;
  hideBottomGradient?: boolean;
}

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
  const { audioOn } = useMenuContext();
  const { playNote, stopNote } = useAudioManager();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovered(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      if (audioOn) {
        playNote(note);
      }
    },
    [audioOn, note, playNote]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (audioOn) {
      stopNote(note);
    }
  }, [audioOn, note, stopNote]);

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
