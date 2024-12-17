import { styled } from "next-yak";
import { GridContainer } from "../components/views/GridContainer";

export default function Projects() {
  return (
    <StyledContainer>
      <GridContainer>Projects</GridContainer>
      <GridContainer>Projects</GridContainer>
      <GridContainer>Projects</GridContainer>
      <GridContainer>Projects</GridContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 50vw;
  max-width: 36rem;
  height: calc(100vh - 14rem);
  max-height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;
