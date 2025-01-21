import { styled } from "next-yak";
import { Container } from "../components/views/Container";
import { theme } from "../theme/theme";
import { kodchasan } from "@/app/theme/fonts";
import { experienceValues } from "./experienceValues";

interface ExperienceTemplateProps {
  company: string;
  title: string;
  companyImageSrc: string;
  websiteUrl: string;
  description: string;
  technologies: string[];
  videoLabel: string;
  videoThumbnailSrc: string;
  videoSrc: string;
  experience: string[];
}

const ExperienceTemplate = ({
  company,
  title,
  companyImageSrc,
  websiteUrl,
  description,
  technologies,
  videoLabel,
  videoThumbnailSrc,
  videoSrc,
  experience,
}: ExperienceTemplateProps) => {
  const isYoutubeVideo =
    videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be");

  return (
    <>
      <StyledTitle>{`${title} @`}</StyledTitle>
      <StyledFlexContainer>
        <a href={websiteUrl} target="_blank">
          <StyledImage src={companyImageSrc} alt={company} />
        </a>
      </StyledFlexContainer>
      <StyledIntroWrapper>
        <StyledParagraph>
          {description}
          <StyledSpan>{`Some of our technologies include:`}</StyledSpan>
        </StyledParagraph>
        <StyledList>
          {technologies.map((technology) => (
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
        <StyledLabel>{videoLabel}</StyledLabel>
      </StyledFlexContainer>
      {isYoutubeVideo ? (
        <StyledIframeWrapper>
          <StyledIframe
            width="409"
            height="727"
            src="https://www.youtube.com/embed/Eu635z7KG9I"
            title="Battleseed Badger for iOS &amp; Android"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </StyledIframeWrapper>
      ) : (
        <VideoWrapper>
          <StyledVideo
            controls
            playsInline
            controlsList="nodownload"
            poster={videoThumbnailSrc}
          >
            <source src={videoSrc} />
            Your browser does not support the video tag.
          </StyledVideo>
        </VideoWrapper>
      )}

      <StyledIntroWrapper>
        <StyledInnerLabelContainer>
          <StyledLabel>Some of my contributions include:</StyledLabel>
        </StyledInnerLabelContainer>
        <StyledList>
          {experience.map((bullet) => (
            <StyledExperienceListitem key={bullet}>
              {bullet}
            </StyledExperienceListitem>
          ))}
        </StyledList>
      </StyledIntroWrapper>
    </>
  );
};

export default function Experience() {
  return (
    <Container>
      {experienceValues.map((experience, index) => (
        <StyledContainer
          $padded={index !== experienceValues.length - 1}
          key={experience.company}
        >
          <ExperienceTemplate {...experience} />
        </StyledContainer>
      ))}
    </Container>
  );
}

interface StyledContainerProps {
  $padded?: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  margin-bottom: ${({ $padded }) => ($padded ? "1rem" : "0")};
`;

const StyledImage = styled.img`
  width: 20rem;
  max-width: 100%;
  object-fit: contain;
  border-radius: 0.25rem;
  max-height: 12rem;
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
  text-align: center;
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

const StyledIframeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StyledIframe = styled.iframe`
  border-radius: 0.25rem;
  border: 0;
  height: 20rem;
  width: 100%;
`;
