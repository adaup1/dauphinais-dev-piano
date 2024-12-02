import { styled } from "next-yak";
import { theme } from "./theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { links } from "./data/links";

export default function About() {
  return (
    <>
      <h1>Welcome!</h1>
      <StyledParagraph>
        {`My name is Andrew Dauphinais, but you can call me Andy. I've been programming since 2019 and have been working professionally as a full-stack software engineer since early 2021.`}
      </StyledParagraph>
      <StyledParagraph>
        {`My tech journey was unorthodox but fueled by a passion for software design. My Bachelor’s degree is in music and sound recording, which I still do as a hobby. I went from making music for games to making games. I then moved onto Konverse, a fast-paced startup with a 4-person development team.`}
      </StyledParagraph>
      <StyledParagraph>
        {`Feel free to peruse my website. You can read about my work experience and check out what I'm currently building in my spare time, like `}
        <StyledLink href="https://windycivi.com/" target="_blank">
          Windy Civi
        </StyledLink>{" "}
        {` and `}
        <StyledLink href="https://typingclassics.com/" target="_blank">
          Typing Classics
        </StyledLink>
        {`!`}
      </StyledParagraph>
      {links.map((link) => (
        <StyledSocialLink href={link.href} target="_blank" key={link.name}>
          <FontAwesomeIcon icon={link.icon} height="2rem" />
          <div>{link.heading}</div>
        </StyledSocialLink>
      ))}
    </>
  );
}

const StyledParagraph = styled.p`
  font-size: 1rem;
  margin-top: 1.2rem;
`;

const StyledLink = styled.a`
  color: ${theme.tan};
  text-decoration: none;
`;

const StyledSocialLink = styled(StyledLink)`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  gap: 1rem;
  margin-top: 1.2rem;
`;
