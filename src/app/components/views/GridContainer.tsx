import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";

import React from "react";

export const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledWrapper>
      <StyledContainer>{children}</StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: calc(100% - 1.5rem);
  max-width: calc(18rem - 0.5rem);
  height: calc(100vh - 14rem);
  max-height: fit-content;

   @media (max-width: 800px) {
    width: 100%;
    max-width: unset;
    height: unset;
  }

`;

const StyledContainer = styled.div`
  height: 100%;
  max-height: fit-content;
  overflow-y: hidden;
  width: 100%;
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${theme.blue};
  z-index: 1;

  filter: drop-shadow(0.5rem 0.5rem 0.5rem black);
`;
