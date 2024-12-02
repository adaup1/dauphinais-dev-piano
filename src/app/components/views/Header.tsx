import { styled } from "next-yak";
import { carattere } from "../../theme/fonts";
import { theme } from "@/app/theme/theme";

export const Header = () => {
  return (
    <StyledContainer>
      <StyledTextContainer>
        <div>Andrew Dauphinais</div>
        <StyledSubHeading>Software Engineer</StyledSubHeading>
      </StyledTextContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 3rem;
  margin-bottom: -2rem;
  font-size: 4rem;
  font-family: ${() => carattere.style.fontFamily};

  /* background: linear-gradient(
    180deg,
    ${theme.veryDarkGreen} 20%,
    ${theme.veryDarkGreen} 60%,
    transparent 100%
  ); */
`;

const StyledTextContainer = styled.div`
  /* filter: drop-shadow(0 0 0.2rem ${theme.white}); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSubHeading = styled.div`
  font-size: 2rem;
`;
