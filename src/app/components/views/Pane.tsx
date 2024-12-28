import { styled } from "next-yak";

type side = "left" | "right";

interface PaneProps {
  children: React.ReactNode;
  side: side;
}

export const Pane = ({ children, side }: PaneProps) => {
  return <StyledContainer side={side}>{children}</StyledContainer>;
};

interface StyledContainerProps {
  side: side;
}

const StyledContainer = styled.div<StyledContainerProps>`
  /* padding: 1rem; */
  height: fit-content;
  max-height: 100%;
  width: fit-content;
  display: flex;
  justify-content: ${({ side }) =>
    side === "left" ? "flex-end" : "flex-start"};

  @media (max-width: 800px) {
    /* height: ${({ side }) => (side === "left" ? "10rem" : "100%")}; */
    width: 100vw;
  }
`;
