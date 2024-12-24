import { styled } from "next-yak";
import { Container } from "../components/views/Container";
import { theme } from "../theme/theme";
import { kodchasan } from "@/app/theme/fonts";
import { konverseBullets } from "./experienceBullets";

const KONVERSE_TECHNOLOGIES = [
  "React",
  "Typescript",
  "Apollo GraphQL",
  "PHP",
  "MySQL",
  "ElasticSearch",
  "Docker",
  "RabbitMQ",
  "AWS",
];

export default function Experience() {
  return (
    <Container>
      <StyledTitle>Full Stack Software Engineer @</StyledTitle>
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
          {KONVERSE_TECHNOLOGIES.map((technology) => (
            <StyledTechListItem key={technology}>
              {technology}
            </StyledTechListItem>
          ))}
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
      <StyledIntroWrapper>
        <StyledInnerLabelContainer>
          <StyledLabel>Some of my contributions include:</StyledLabel>
        </StyledInnerLabelContainer>
        <StyledList>
          {konverseBullets.map((bullet) => (
            <StyledExperienceListitem key={bullet}>
              {bullet}
            </StyledExperienceListitem>
          ))}
        </StyledList>
      </StyledIntroWrapper>
    </Container>
  );
}

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
  margin-bottom: 1rem;
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
  text-align: center;
`;

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

const StyledTechListItem = styled.li`
  background-color: ${theme.blue};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
`;

const StyledExperienceListitem = styled.li`
  display: flex;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "\2605";
    position: absolute;
    left: 0;
    margin-right: 0.5rem;
  }
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;

const StyledIntroWrapper = styled.div`
  padding: 1rem;
  background-color: ${theme.darkBlue};
  border-radius: 0.25rem;
`;

const StyledInnerLabelContainer = styled.div`
  display: flex;
  justify-content: center;
`;
