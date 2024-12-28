"use client";

import { styled } from "next-yak";
import { MenuContextProvider } from "./context";
import { Keyboard } from "./Keyboard";
import { AudioButton } from "./audioButton";

import { MobileMenu } from "./MobileMenu";

export const Menu = () => {
  return (
    <MenuContextProvider>
      <StyledContainer>
        <StyledMenuContainer>
          <Keyboard />
          <StyledAudioButtonContainer>
            <AudioButton />
          </StyledAudioButtonContainer>
        </StyledMenuContainer>
        <StyledMobileMenuContainer>
          <MobileMenu />
        </StyledMobileMenuContainer>
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

const StyledAudioButtonContainer = styled.div`
  padding: 0.5rem;
  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;

const StyledMobileMenuContainer = styled.div`
  display: none;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    ${StyledMenuContainer} {
      display: none;
    }
    ${StyledMobileMenuContainer} {
      display: block;
    }
  }
`;
