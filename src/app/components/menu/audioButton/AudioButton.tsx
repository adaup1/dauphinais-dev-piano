"use client";

import { useCallback, useState } from "react";
import { VolumeOffSvg } from "./VolumeOffSvg";
import { VolumeOnSvg } from "./VolumeOnSvg";
import { useMenuContext } from "../context";
import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";

export const AudioButton = () => {
  const { audioOn, setAudioOn } = useMenuContext();
  const [iconColor, setIconColor] = useState(theme.silver);

  const handleOnClick = useCallback(() => {
    setAudioOn(!audioOn);
  }, [audioOn, setAudioOn]);

  const handleMouseEnter = useCallback(() => {
    setIconColor(theme.white);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIconColor(theme.silver);
  }, []);

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
