"use client";
import { useState, useCallback } from "react";
import { styled } from "next-yak";
import { theme } from "../../../theme/theme";
import { carattere } from "../../../theme/fonts";
import Link from "next/link";
import { MusicNote } from "./MusicNote";
import { sampleMap } from "../sampleMap";
import { usePathname } from "next/navigation";
import get from "lodash/get";

type note = "F" | "G" | "A" | "B";

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
  const [sample, setSample] = useState<HTMLAudioElement | null>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovered(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!sample) {
        const audio = new Audio(sampleMap["B"]);
        setSample(audio);
        // audio.play();
      } else {
        sample.currentTime = 0;
        // sample.play();
      }
    },
    [sample]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    sample?.pause();
  }, [sample]);

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

const clipPathMap = {
  B: {
    default: "polygon(39% 54%, 39% 100%, 100% 100%, 100% 0%, 0% 0%, 0% 54%)",
    hover:
      "polygon(39.7% 53.5%, 39.7% 99%, 99.3% 97%, 99.3% 3%, 0% 0%, 0% 54%)",
  },
  A: {
    default:
      "polygon(39% 16%, 39% 0%, 100% 0%, 100% 100%, 39% 100%, 39% 68%, 0% 68%, 0% 16%)",
    hover:
      "polygon(39.7% 16.5%, 39.7% 1%, 99.3% 3%, 99.3% 97%, 39.7% 99%, 39.7% 67.5%, 0% 68%, 0% 16%)",
  },
  G: {
    default:
      "polygon(39% 30%, 39% 0%, 100% 0%, 100% 100%, 39% 100%, 39% 80%, 0% 80%, 0% 30%)",
    hover:
      "polygon(39.7% 30.5%, 39.7% 1%, 99.3% 3%, 99.3% 97%, 39.7% 99%, 39.7% 79.5%, 0% 80%, 0% 30%)",
  },
  F: {
    default: "polygon(39% 44%, 39% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 44%)",
    hover:
      "polygon(39.7% 44.5%, 39.7% 1%, 99.3% 3%, 99.3% 97%, 0% 100%, 0% 44%)",
  },
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
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 20%,
      #bdbdbd22 100%
    );
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
        return "linear-gradient(0deg, white 0%, white 82%, #b6b6b6 100%)";
      }
      if (hideTopGradient) {
        return "linear-gradient(0deg, #b6b6b6 0%, white 18%, white 100%)";
      }
      return "linear-gradient(0deg, #b6b6b6 0%, white 18%, white 82%, #b6b6b6 100%)";
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
  color: ${theme.darkGreen};
  z-index: 10;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  filter: ${({ isActive }) =>
    isActive ? `drop-shadow(0 0.1rem 1rem ${theme.white})` : "none"};
`;
