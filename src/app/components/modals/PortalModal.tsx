import { createPortal } from "react-dom";
import { styled } from "next-yak";
import { theme } from "@/app/theme/theme";
import { motion } from "framer-motion";

interface PortalModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const PortalModal = ({ children, isOpen }: PortalModalProps) => {
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <StyledOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledModal
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {children}
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
};

const StyledOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
  z-index: 1000;
`;

const StyledModal = styled(motion.div)`
  background-color: ${theme.darkBlue};
  color: ${theme.white};
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  text-align: center;
  border: 2px solid ${theme.silver};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
