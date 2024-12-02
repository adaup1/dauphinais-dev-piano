"use client";
import { styled } from "next-yak";
import { WhiteKey, BlackKey } from "./keys";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();

  return (
    <StyledContainer>
      <WhiteKey
        name="About"
        isTopKey={true}
        href="/"
        isActive={pathname === "/"}
      />
      <WhiteKey
        name="Experience"
        href="/experience"
        isActive={pathname === "/experience"}
      />
      <WhiteKey
        name="What I'm Building"
        href="/portfolio"
        isActive={pathname === "/portfolio"}
      />
      <WhiteKey
        name="Contact"
        href="/contact"
        isActive={pathname === "/contact"}
      />
      <BlackKey note="Bb" />
      <BlackKey note="Ab" />
      <BlackKey note="Gb" />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 30rem;
  position: relative;
`;
