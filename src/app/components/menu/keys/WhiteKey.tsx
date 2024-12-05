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
}

export const WhiteKey = ({
  name = "",
  href = "/",
  note = "B",
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
      >
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
      "polygon(39% 16%, 39% 0%, 100% 0%, 100% 100%, 39% 100%, 39% 68%, 0 68%, 0 16%)",
    hover:
      "polygon(39.7% 16.5%, 39.7% 1%, 99.3% 3%, 99.3% 97%, 39.7% 99%, 39.7% 67.5%, 0 68%, 0 16%)",
  },
  G: {
    default:
      "polygon(39% 30%, 39% 0%, 100% 0%, 100% 100%, 39% 100%, 39% 80%, 0 80%, 0 30%)",
    hover:
      "polygon(39.7% 30.5%, 39.7% 1%, 99.3% 3%, 99.3% 97%, 39.7% 99%, 39.7% 79.5%, 0 80%, 0 30%)",
  },
  F: {
    default: "polygon(39% 44%, 39% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 44%)",
    hover:
      "polygon(39.7% 44.5%, 39.7% 1%, 99.3% 3%, 99.3% 97%, 0% 100%, 0% 44%)",
  },
};

interface StyledContainerProps {
  note: note;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 5rem;
  /* border-radius: 0 0.2rem 0.2rem 0; */
  background: ${theme.white};
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 2rem;
  padding: 1rem;
  font-family: ${() => carattere.style.fontFamily};
  cursor: pointer;

  clip-path: ${({ note }) => get(clipPathMap, [note, "default"], "none")};

  &:hover {
    background: linear-gradient(
      90deg,
      ${theme.white} 20%,
      ${theme.fadedWhite} 100%
    );
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
  color: ${theme.white};
  filter: ${({ isActive }) =>
    isActive ? `drop-shadow(0 0.1rem 1rem ${theme.white})` : "none"};
`;
