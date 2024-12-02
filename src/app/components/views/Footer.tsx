import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const links = [
  {
    icon: faGithub,
    href: "https://github.com/adaup1",
    label: "Github",
  },
  {
    icon: faLinkedin,
    href: "https://www.linkedin.com/in/andrewdauphinais/",
    label: "LinkedIn",
  },
];

export const Footer = () => {
  return (
    <StyledFooter>
      {links.map((link) => (
        <StyledLink href={link.href} target="_blank" key={link.label}>
          <div>
            <FontAwesomeIcon
              icon={link.icon}
              color={theme.black}
              height="1.5rem"
            />
          </div>
          <div>{link.label}</div>
        </StyledLink>
      ))}
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.black};
  font-weight: 600;
  font-size: 1rem;
`;
