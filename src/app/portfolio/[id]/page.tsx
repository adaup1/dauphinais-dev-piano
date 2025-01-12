import { Container } from "@/app/components/views";
import { portfolioItems } from "@/app/portfolio/portfolioItems";
import { notFound } from "next/navigation";
import { styled } from "next-yak";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { theme } from "@/app/theme/theme";
import { kodchasan } from "@/app/theme/fonts";

const Page = ({ params }: { params: { id: string } }) => {
  const item = portfolioItems.find((item) => item.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <Container>
      <StyledFlexContainer>
        <StyledBackLink href="/portfolio">
          <FontAwesomeIcon icon={faCaretLeft} size="2x" />
        </StyledBackLink>
        <StyledTitle>{item.title}</StyledTitle>
      </StyledFlexContainer>
      <StyledImage src={item.image} alt={item.title} />
      <StyledLinkContainer>
        <StyledLink href={item.websiteUrl} target="_blank">
          Try it out!
        </StyledLink>
        <StyledLink href={item.repoUrl} target="_blank">
          View the code
        </StyledLink>
      </StyledLinkContainer>
      <p>{item.description}</p>
    </Container>
  );
};

export default Page;

const StyledBackLink = styled(Link)`
  color: ${theme.white};

  &:hover {
    color: ${theme.silver};
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  margin-bottom: 1rem;

  // Position the back button on the left while keeping title centered
  ${StyledBackLink} {
    position: absolute;
    left: 0;
  }
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  font-family: ${() => kodchasan.style.fontFamily};
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 0.5rem;
  font-size: 1.5rem;
`;

const StyledLink = styled.a`
  color: ${theme.silver};
  text-decoration: none;
  transition: all 120ms ease-in-out;

  &:hover {
    color: ${theme.black};
  }
`;
