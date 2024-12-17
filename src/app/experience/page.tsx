import { styled } from "next-yak";
import { Container } from "../components/views/Container";
import { theme } from "../theme/theme";
import { kodchasan } from "@/app/theme/fonts";

export default function Experience() {
  return (
    <Container>
      <StyledTitle>
        Full Stack Software Engineer @
        {/* <StyledLink href="https://konverse.com/">Konverse</StyledLink> */}
      </StyledTitle>
      <StyledFlexContainer>
        <a href="https://konverse.com/" target="_blank">
          <StyledImage src="/images/konverse-logo.png" alt="Koverse Logo" />
        </a>
      </StyledFlexContainer>
      <StyledIntroWrapper>
        <StyledParagraph>
          {`I've been working at Konverse as a full stack software engineer since early 2021. Konverse has a small team, so every developer touches every part of the stack. `}
          <StyledSpan>{`Some of our technologies include:`}</StyledSpan>
        </StyledParagraph>
        <StyledList>
          <StyledListItem>React</StyledListItem>
          <StyledListItem>Typescript</StyledListItem>
          <StyledListItem>Apollo GraphQL</StyledListItem>
          <StyledListItem>PHP</StyledListItem>
          <StyledListItem>MySQL</StyledListItem>
          <StyledListItem>ElasticSearch</StyledListItem>
          <StyledListItem>Docker</StyledListItem>
          <StyledListItem>RabbitMQ</StyledListItem>
          <StyledListItem>AWS</StyledListItem>
        </StyledList>
        <StyledParagraph>
          <StyledSpan>AND MORE!</StyledSpan>
        </StyledParagraph>
      </StyledIntroWrapper>
      <StyledFlexContainer>
        <StyledLabel>Watch to learn how Konverse works:</StyledLabel>
      </StyledFlexContainer>
      <VideoWrapper>
        <StyledVideo
          controls
          playsInline
          controlsList="nodownload"
          poster="https://konverse.com/wp-content/uploads/2023/06/video-poster.jpg"
        >
          <source
            src="https://konverse.com/wp-content/uploads/2023/06/Konverse-Demo-V4-with-VO-061223.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </StyledVideo>
      </VideoWrapper>
      <StyledParagraph>Here is my experience</StyledParagraph>
    </Container>
  );
}

// const StyledContainer = styled.div``;

const StyledImage = styled.img`
  width: 20rem;
  max-width: 100%;
  object-fit: contain;
  border-radius: 0.25rem;
`;

const VideoWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio (9 / 16 = 0.5625)
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  object-fit: cover;
`;

const StyledTitle = styled.h2`
  font-family: ${() => kodchasan.style.fontFamily};
  font-weight: 500;
  text-align: center;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const StyledParagraph = styled.p`
  width: 100%;
  font-size: 1rem;
`;

// const StyledLink = styled.a`
//   color: ${theme.silver};
//   font-weight: 700;
//   text-decoration: none;
//   transition: all 120ms ease-in-out;

//   &:hover {
//     color: ${theme.black};
//   }
// `;

const StyledLabel = styled.label`
  font-family: ${() => kodchasan.style.fontFamily};
  font-weight: 500;
  font-size: 1.2rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const StyledListItem = styled.li`
  background-color: ${theme.blue};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;

const StyledIntroWrapper = styled.div`
  padding: 1rem;
  background-color: ${theme.darkBlue};
  border-radius: 0.25rem;
  /* border: 1px solid ${theme.white}; */
`;
