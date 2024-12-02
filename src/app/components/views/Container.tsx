import { theme } from "@/app/theme/theme";
import { styled } from "next-yak";

import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 30rem;
  position: relative;
  border: 1px solid ${theme.white};
  border-radius: 0.2rem;
  padding: 1rem;
  background-color: ${theme.mediumGreen};
`;
