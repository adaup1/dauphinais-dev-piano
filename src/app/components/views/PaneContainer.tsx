import { styled } from "next-yak";
import { Pane } from "./Pane";
import { Menu } from "../menu";

const Panes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Pane side="left">
        <Menu />
      </Pane>
      <Pane side="right">{children}</Pane>
    </>
  );
};

export const PaneContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContainer>
      <StyledDesktopContainer>
        <Panes>{children}</Panes>
      </StyledDesktopContainer>
      <StyledMobileContainer>
        <Panes>{children}</Panes>
      </StyledMobileContainer>
    </StyledContainer>
  );
};

const StyledDesktopContainer = styled.div`
  display: flex;
  height: calc(100vh - 12rem);
  width: 100%;
  justify-content: center;
  flex-wrap: nowrap;
  overflow: hidden;
  gap: 2rem;
`;

const StyledMobileContainer = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  /* flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  position: relative; */
`;

const StyledContainer = styled.div`
  @media (max-width: 800px) {
    ${StyledDesktopContainer} {
      display: none;
    }
    ${StyledMobileContainer} {
      display: block;
    }
  }
`;
