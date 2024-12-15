import { styled } from "next-yak";

export const PaneContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContainer>
      <StyledDesktopContainer>{children}</StyledDesktopContainer>
      <StyledMobileContainer>{children}</StyledMobileContainer>
    </StyledContainer>
  );
};

const StyledDesktopContainer = styled.div`
  display: flex;
  height: calc(100vh - 12rem);
  width: 100%;
  justify-content: center;
  flex-wrap: nowrap;
`;

const StyledMobileContainer = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`;

const StyledContainer = styled.div`
  @media (max-width: 800px) {
    ${StyledDesktopContainer} {
      display: none;
    }
    ${StyledMobileContainer} {
      display: flex;
    }
  }
`;
