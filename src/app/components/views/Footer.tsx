import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { links } from "../../data/links";
import { kodchasan } from "@/app/theme/fonts";

export const Footer = () => {
  return (
    <StyledFooter>
      {links.map((link) => (
        <StyledLink href={link.href} target="_blank" key={link.name}>
          <FontAwesomeIcon
            icon={link.icon}
            color={theme.black}
            height="1.5rem"
          />
          <div>{link.name}</div>
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
  /* font-family: ${() => kodchasan.style.fontFamily}; */
  color: ${theme.black};
  font-weight: 600;
  font-size: 1rem;
`;
