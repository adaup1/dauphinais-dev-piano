import { styled } from "next-yak";
import { WhiteKey, BlackKey } from "./keys";

export const Menu = () => {
  return (
    <StyledContainer>
      <WhiteKey name="About" href="/" note="B" />
      <WhiteKey name="Experience" href="/experience" note="A" />
      <WhiteKey name="What I'm Building" href="/portfolio" note="G" />
      <WhiteKey name="Contact" href="/contact" note="F" />
      <BlackKey note="Bb" />
      <BlackKey note="Ab" />
      <BlackKey note="Gb" />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 30rem;
  position: relative;
`;
