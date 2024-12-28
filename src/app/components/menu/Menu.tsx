"use client";

import { useState, useCallback, useMemo } from "react";
import { styled } from "next-yak";
import { theme } from "../../theme/theme";
import { MenuContextProvider } from "./context";
import { Keyboard } from "./Keyboard";
import { AudioButton } from "./audioButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { kodchasan } from "@/app/theme/fonts";

export const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const icon = useMemo(
    () => (isMobileMenuOpen ? faTimes : faBars),
    [isMobileMenuOpen]
  );

  const handleOnMobileMenuClick = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <MenuContextProvider>
      <StyledContainer>
        <StyledMenuContainer>
          <Keyboard />
        </StyledMenuContainer>
        <StyledMobileMenuContainer>
          <StyledButton onClick={handleOnMobileMenuClick}>
            <StyledFontAwesomeIcon icon={icon} />
          </StyledButton>
          <StyledTitle>Andrew Dauphinais</StyledTitle>
          {isMobileMenuOpen && (
            <StyledMobileKeyboardContainer>
              <Keyboard />
            </StyledMobileKeyboardContainer>
          )}
        </StyledMobileMenuContainer>
        {/* <StyledAudioButtonContainer>
          <AudioButton />
        </StyledAudioButtonContainer> */}
      </StyledContainer>
    </MenuContextProvider>
  );
};

const StyledMenuContainer = styled.div`
  height: fit-content;
  width: 25vw;
  max-width: 18rem;
  position: relative;
  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;

const StyledMobileMenuContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 3rem;
  background-color: ${theme.white};
  position: relative;
`;

const StyledAudioButtonContainer = styled.div`
  /* margin-top: 1rem; */
  padding: 0.5rem;
  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    /* position: absolute; */
    /* height: 10rem;
    top: 0%;
    left: 50%; */

    ${StyledMenuContainer} {
      display: none;
    }
    ${StyledMobileMenuContainer} {
      display: flex;
    }
  }
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
