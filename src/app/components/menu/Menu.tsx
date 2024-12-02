import { styled } from "next-yak";
import { WhiteKey, BlackKey } from "./keys";

export const Menu = () => {
  return (
    <StyledContainer>
      <WhiteKey name="About" isTopKey={true} href="/" />
      <WhiteKey name="Experience" href="/experience" />
      <WhiteKey name="What I'm Building" href="/portfolio" />
      <WhiteKey name="Contact" href="/contact" />
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
