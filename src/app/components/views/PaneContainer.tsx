import { styled } from "next-yak";

export const PaneContainer = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  display: flex;
  height: calc(100vh - 12rem);
  width: 100%;
  flex-wrap: nowrap;
`;
