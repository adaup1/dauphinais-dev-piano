import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";

import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledWrapper>
      <StyledContainer>{children}</StyledContainer>
      <StyledGradient />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 50vw;
  max-width: 36rem;
  height: calc(100vh - 14rem);
  max-height: fit-content;
`;

const StyledContainer = styled.div`
  height: 100%;
  max-height: fit-content;
  overflow-y: auto;
  width: 100%;
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${theme.blue};
  z-index: 1;

  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;

const StyledGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  border-radius: 0.5rem;
  background: linear-gradient(
    0,
    ${theme.blue} 0%,
    transparent 5%,
    transparent 95%,
    ${theme.blue} 100%
  );
  pointer-events: none;
`;
