import { styled } from "next-yak";
import { GridContainer } from "../components/views/GridContainer";
import { portfolioItems } from "./portfolioItems";
import Image from "next/image";
import { kodchasan } from "../theme/fonts";
import Link from "next/link";

export default function Projects() {
  return (
    <StyledContainer>
      {portfolioItems.map((item) => (
        <StyledLink href={`/portfolio/${item.id}`} key={item.id}>
          <GridContainer key={item.id}>
            <StyledImage
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
            />
            <StyledTitle>{item.title}</StyledTitle>
            <StyledDescription>{item.description}</StyledDescription>
          </GridContainer>
        </StyledLink>
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 50vw;
  max-width: 36rem;
  height: calc(100vh - 13.2rem);
  overflow-y: scroll;
  max-height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  padding-bottom: 1.5rem;
  margin-bottom: -1.5rem;

  @media (max-width: 800px) {
    justify-content: center;
    width: 100vw;
    max-width: 100%;
    margin: 1rem;
    height: calc(100vh - 7rem);
    margin-right: -0.5rem;
    padding-right: 1.5rem;
  }


  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

`;

const StyledImage = styled(Image)`  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const StyledLink = styled(Link)`
  width: calc(50% - 1rem);
  margin-right: -1.5em;
  text-decoration: none;
  color: inherit;

  @media (max-width: 800px) {
    width: calc(100% - 1rem);
    margin-right: 0;
  }
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: ${() => kodchasan.style.fontFamily};
  margin-bottom: 0.5rem;
`;

const StyledDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

