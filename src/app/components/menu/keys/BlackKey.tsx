import { styled } from "next-yak";
import { theme } from "../../../theme/theme";

type note = "Gb" | "Ab" | "Bb";

interface BlackKeyProps {
  note: note;
}

export const BlackKey = ({ note = "Bb" }: BlackKeyProps) => {
  return <StyledContainer note={note}></StyledContainer>;
};

interface StyledContainerProps {
  note: note;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: calc(100% - 15rem);
  max-width: 50%;
  height: 2.92rem;
  border-top: 1px solid ${theme.white};
  border-bottom: 1px solid ${theme.white};
  border-right: 1px solid ${theme.white};
  border-radius: 0 0.2rem 0.2rem 0;
  background-color: ${theme.darkGreen};
  background: linear-gradient(
    90deg,
    ${theme.darkGreen} 0%,
    ${theme.veryDarkGreen} 100%
  );

  z-index: 10;
  position: absolute;
  top: ${({ note }) => {
    switch (note) {
      case "Bb":
        return "2.92rem";
      case "Gb":
        return "14.48rem";
      case "Ab":
        return "8.76rem";
      case "Gb":
        return "14.6rem";
      default:
        throw new Error("Invalid note");
    }
  }};
`;
