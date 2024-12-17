"use client";

import { styled } from "next-yak";
import { MenuContextProvider } from "./context";
import { Keyboard } from "./Keyboard";
import { AudioButton } from "./audioButton";

export const Menu = () => {
  return (
    <MenuContextProvider>
      <StyledContainer>
        <StyledMenuContainer>
          <Keyboard />
        </StyledMenuContainer>
        <StyledMobileMenuContainer>
          <Keyboard />
        </StyledMobileMenuContainer>
        <StyledAudioButtonContainer>
          <AudioButton />
        </StyledAudioButtonContainer>
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
  height: 100%;
  max-height: calc(100vw - 0.5rem);
  width: 10rem;
  transform: rotate(90deg);
  display: none;
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
    position: absolute;
    height: 10rem;
    top: 0%;
    left: 50%;

    ${StyledMenuContainer} {
      display: none;
    }
    ${StyledMobileMenuContainer} {
      display: block;
    }
  }
`;
