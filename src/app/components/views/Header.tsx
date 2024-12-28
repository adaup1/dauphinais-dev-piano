import { styled } from "next-yak";
import { kodchasan } from "../../theme/fonts";
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
  margin-bottom: -1rem;
  font-size: 4rem;
  color: ${theme.silver};
  cursor: default;
  font-family: ${() => kodchasan.style.fontFamily};
  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);

  @media (max-width: 800px) {
    display: none;
    font-size: 8vw;
  }
  @media (max-width: 400px) {
    font-size: 2rem;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSubHeading = styled.div`
  font-size: 1.5rem;

  @media (max-width: 800px) {
    font-size: 3vw;
  }
  @media (max-width: 520px) {
    font-size: 1rem;
  }
`;
