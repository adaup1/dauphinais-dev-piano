"use client";
import { useState, useCallback } from "react";
import { styled } from "next-yak";
import { theme } from "../../../theme/theme";
import { carattere } from "../../../theme/fonts";
import Link from "next/link";
import { MusicNote } from "./MusicNote";

interface WhiteKeyProps {
  name: string;
  href: string;
  isTopKey?: boolean;
  isActive?: boolean;
}

export const WhiteKey = ({
  name = "",
  href = "/",
  isTopKey = false,
  isActive = false,
}: WhiteKeyProps) => {
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
      isTopKey={isTopKey}
      isActive={isActive}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href}>{name}</Link>
      {isHovered && <MusicNote x={mousePos.x} y={mousePos.y} />}
    </StyledContainer>
  );
};

interface StyledContainerProps {
  isTopKey?: boolean;
  isActive?: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 5rem;
  border-top: ${({ isTopKey }) =>
    isTopKey ? `1px solid ${theme.white}` : "none"};
  border-bottom: 1px solid ${theme.white};
  border-right: 1px solid ${theme.white};
  border-radius: 0 0.2rem 0.2rem 0;
  background: linear-gradient(
    90deg,
    ${theme.darkGreen} 0%,
    ${theme.mediumGreen} 100%
  );

  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 2rem;
  padding: 1rem;
  font-family: ${() => carattere.style.fontFamily};
  cursor: pointer;

  & > a {
    color: ${theme.white};
    text-decoration: none;
    filter: ${({ isActive }) =>
      isActive ? `drop-shadow(0 0.1rem 1rem ${theme.white})` : "none"};
  }

  &:hover {
    background: linear-gradient(
      90deg,
      ${theme.darkGreen} 0%,
      ${theme.green} 100%
    );
  }
`;
