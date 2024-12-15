import { styled } from "next-yak";
import { WhiteKey, BlackKey } from "./keys";
import { AudioButton } from "../audioButton";

export const Menu = () => {
  return (
    <StyledContainer>
      <StyledMenuContainer>
        <WhiteKey name="About" href="/" note="B" hideTopGradient />
        <WhiteKey name="Experience" href="/experience" note="A" />
        <WhiteKey name="Portfolio" href="/portfolio" note="G" />
        <WhiteKey name="Contact" href="/contact" note="F" hideBottomGradient />
        <BlackKey note="Bb" />
        <BlackKey note="Ab" />
        <BlackKey note="Gb" />
      </StyledMenuContainer>
      <StyledAudioButtonContainer>
        <AudioButton />
      </StyledAudioButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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
`;

const StyledAudioButtonContainer = styled.div`
  /* margin-top: 1rem; */
  padding: 0.5rem;
  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;
