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
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: ${({ side }) =>
    side === "left" ? "flex-end" : "flex-start"};
`;
