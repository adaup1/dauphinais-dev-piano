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
  height: calc(100vh - 14rem);
  overflow-y: auto;
  max-height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
