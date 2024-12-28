"use client";

import { useCallback, useState, useMemo } from "react";
import { VolumeOffSvg } from "./VolumeOffSvg";
import { VolumeOnSvg } from "./VolumeOnSvg";
import { useMenuContext } from "../context";
import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";

interface AudioButtonProps {
  isMobile?: boolean;
}

export const AudioButton = ({ isMobile = false }: AudioButtonProps) => {
  const { audioOn, setAudioOn } = useMenuContext();
  const buttonColor = useMemo(
    () => (isMobile ? theme.black : theme.silver),
    [isMobile]
  );
  const hoverColor = useMemo(
    () => (isMobile ? theme.black : theme.white),
    [isMobile]
  );
  const [iconColor, setIconColor] = useState(buttonColor);

  const handleOnClick = useCallback(() => {
    setAudioOn(!audioOn);
  }, [audioOn, setAudioOn]);

  const handleMouseEnter = useCallback(() => {
    setIconColor(hoverColor);
  }, [hoverColor]);

  const handleMouseLeave = useCallback(() => {
    setIconColor(buttonColor);
  }, [buttonColor]);

  return (
    <StyledButton
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={audioOn ? "Mute audio" : "Turn on audio"}
    >
      {audioOn ? (
        <VolumeOnSvg color={iconColor} width="1.5rem" height="1.5rem" />
      ) : (
        <VolumeOffSvg color={iconColor} width="1.5rem" height="1.5rem" />
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
`;
