import { styled, keyframes } from "next-yak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@/app/theme/theme";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const float = keyframes`
  from {
    transform: translate(-50%, -50%);
  }
  to {
    transform: translate(-50%, calc(-50% - 20px));
  }
`;

interface MusicNoteProps {
  x: number;
  y: number;
}

export const MusicNote = ({ x, y }: MusicNoteProps) => {
  return (
    <StyledContainer $x={x} $y={y}>
      <FontAwesomeIcon icon={faMusic} width="1.5rem" color={"#222222"} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  z-index: 20;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  animation: ${fadeOut} 0.5s ease-out forwards, ${float} 0.7s ease-out forwards;
  animation-delay: 0.2s, 0s;
  filter: drop-shadow(0 0 0.3rem ${theme.white});
`;
