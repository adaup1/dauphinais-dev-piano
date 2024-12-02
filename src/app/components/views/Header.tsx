import { styled } from "next-yak";
import { carattere } from "../../theme/fonts";

export const Header = () => {
  return (
    <StyledContainer>
      <div>Andrew Dauphinais</div>
      <StyledSubHeading>Software Engineer</StyledSubHeading>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;
  font-size: 4rem;
  font-family: ${() => carattere.style.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    0deg,
    transparent 0%,
    #0c2418 50%,
    transparent 100%
  );
`;

const StyledSubHeading = styled.div`
  font-size: 2rem;
`;
