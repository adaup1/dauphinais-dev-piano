import { styled } from "next-yak";
import { theme } from "../../../theme/theme";
import { carattere } from "../../../theme/fonts";
import Link from "next/link";

interface WhiteKeyProps {
  name: string;
  href: string;
  isTopKey?: boolean;
}

export const WhiteKey = ({
  name = "",
  href = "/",
  isTopKey = false,
}: WhiteKeyProps) => {
  return (
    <StyledContainer isTopKey={isTopKey}>
      <Link href={href}>{name}</Link>
    </StyledContainer>
  );
};

interface StyledContainerProps {
  isTopKey?: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 5rem;
  border-top: ${({ isTopKey }) =>
    isTopKey ? `1px solid ${theme.white}` : "none"};
  border-bottom: 1px solid ${theme.white};
  border-right: 1px solid ${theme.white};
  border-radius: 0 0.2rem 0.2rem 0;
  background: linear-gradient(
    90deg,
    ${theme.darkGreen} 0%,
    ${theme.mediumGreen} 100%
  );

  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 2rem;
  padding: 1rem;
  font-family: ${() => carattere.style.fontFamily};
  cursor: pointer;

  & > a {
    color: ${theme.white};
    text-decoration: none;
  }

  &:hover {
    background: linear-gradient(
      90deg,
      ${theme.darkGreen} 0%,
      ${theme.green} 100%
    );
  }
`;
