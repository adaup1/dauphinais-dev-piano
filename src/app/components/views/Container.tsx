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
  width: 100%;
  max-width: 30rem;
  height: calc(100vh - 14rem);
  max-height: fit-content;
`;

const StyledContainer = styled.div`
  height: 100%;
  max-height: fit-content;
  overflow-y: auto;
  width: 100%;
  position: relative;
  border: 1px solid ${theme.white};
  border-radius: 0.2rem;
  padding: 1rem;
  background-color: ${theme.mediumGreen};
  z-index: 1;
`;

const StyledGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  border-radius: 0.2rem;
  border: 1px solid ${theme.white};
  background: linear-gradient(
    0,
    ${theme.mediumGreen} 0%,
    transparent 5%,
    transparent 95%,
    ${theme.mediumGreen} 100%
  );
  pointer-events: none;
`;
