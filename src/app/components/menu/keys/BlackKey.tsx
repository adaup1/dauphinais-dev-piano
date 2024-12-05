"use client";

import { styled } from "next-yak";
import { theme } from "../../../theme/theme";
import { useState, useCallback } from "react";
import { MusicNote } from "./MusicNote";

type note = "Gb" | "Ab" | "Bb";

interface BlackKeyProps {
  note: note;
}

export const BlackKey = ({ note = "Bb" }: BlackKeyProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setIsHovered(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

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
`;

const StyledOverlayShort = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
  background: linear-gradient(90deg, rgba(7, 20, 14, 1) 88%, #2b2b2b 100%);
  clip-path: polygon(92% 12%, 100% 0, 100% 100%, 92% 88%);
`;

const StyledContainer = styled.div<StyledContainerProps>`
  width: calc(100% - 15rem);
  max-width: 50%;
  height: 2.92rem;
  background-color: #434343;

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

    & ${StyledOverlayLong} {
      clip-path: polygon(0 0, 100% 12%, 100% 88%, 0% 100%);
    }

    & ${StyledOverlayShort} {
      clip-path: polygon(95% 12%, 100% 0, 100% 100%, 95% 88%);
      background: linear-gradient(90deg, rgba(7, 20, 14, 1) 91%, #323232 100%);
    }
  }
`;
