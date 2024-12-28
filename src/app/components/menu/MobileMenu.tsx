"use client";

import { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { styled } from "next-yak";
import { theme } from "../../theme/theme";
import { kodchasan } from "@/app/theme/fonts";
import { Keyboard } from "./Keyboard";
import { useMenuContext } from "./context";
import { AudioButton } from "./audioButton/AudioButton";

export const MobileMenu = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMenuContext();

  const icon = useMemo(
    () => (isMobileMenuOpen ? faTimes : faBars),
    [isMobileMenuOpen]
  );

  const handleOnMobileMenuClick = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <StyledMobileMenuContainer>
      <StyledButton onClick={handleOnMobileMenuClick}>
        <StyledFontAwesomeIcon icon={icon} />
      </StyledButton>
      <StyledTitle>Andrew Dauphinais</StyledTitle>
      {isMobileMenuOpen && (
        <StyledAudioButtonContainer>
          <AudioButton isMobile={true} />
        </StyledAudioButtonContainer>
      )}
      {isMobileMenuOpen && (
        <StyledMobileKeyboardContainer>
          <Keyboard />
        </StyledMobileKeyboardContainer>
      )}
    </StyledMobileMenuContainer>
  );
};

const StyledMobileMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 3rem;
  background-color: ${theme.white};
  position: relative;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${theme.black};
  height: 2rem;
`;

const StyledMobileKeyboardContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 0%;
  width: 100vw;
  height: fit-content;
  z-index: 1000;
  background-color: ${theme.darkBlue};
  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;

const StyledTitle = styled.div`
  color: ${theme.black};
  font-size: 1.5rem;
  font-family: ${() => kodchasan.style.fontFamily};
  width: max-content;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledAudioButtonContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 25%;
`;
