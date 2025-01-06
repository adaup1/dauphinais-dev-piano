"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "../components/views/Container";
import { useSendEmail } from "./hooks/useSendEmail";
import { FormData } from "./types.d";
import { styled, keyframes } from "next-yak";
import { theme } from "../theme/theme";
import { kodchasan } from "../theme/fonts";
import { AnimatePresence, motion } from "framer-motion";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
`;

const Contact = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { sendEmail } = useSendEmail();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      await sendEmail(data);
      reset();
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <StyledHeading>Contact</StyledHeading>
      <p>
        {`Feel free to fill out this contact form and I'll get back to you as soon
        as I can. You can also message me on `}
        <StyledLink
          href="https://www.linkedin.com/in/andrewdauphinais/"
          target="_blank"
        >
          LinkedIn
        </StyledLink>
        {`.`}
      </p>
      <br />
      <AnimatePresence>
        {isSubmitted && (
          <StyledModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledSuccessMessage>
              Thank you! Your message has been sent successfully.
            </StyledSuccessMessage>
          </StyledModal>
        )}
      </AnimatePresence>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormGroup>
          <StyledLabel htmlFor="name">Full Name</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Full Name"
            {...register("name", { required: true })}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="email">Email Address</StyledLabel>
          <StyledInput
            type="email"
            placeholder="example@domain.com"
            {...register("email", { required: true })}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="message">Message</StyledLabel>
          <StyledTextarea
            rows={4}
            placeholder="Type your message"
            {...register("message", { required: true })}
          />
        </StyledFormGroup>
        <StyledFormGroup className="submit-group">
          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <StyledLoader>
                <StyledLoaderDot delay="0s" />
                <StyledLoaderDot delay="0.1s" />
                <StyledLoaderDot delay="0.2s" />
              </StyledLoader>
            ) : (
              "Submit"
            )}
          </StyledButton>
        </StyledFormGroup>
      </StyledForm>
    </Container>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.submit-group {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 1.2rem;
  color: ${theme.white};
`;

const StyledInput = styled.input`
  padding: 0.8rem;
  border-radius: 0.25rem;
  border: 2px solid ${theme.darkBlue};
  background-color: ${theme.darkBlue};
  color: ${theme.white};
  font-size: 1rem;
  transition: all 120ms ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.silver};
  }

  &::placeholder {
    color: ${theme.fadedWhite};
  }
`;

const StyledTextarea = styled.textarea`
  padding: 0.8rem;
  border-radius: 0.25rem;
  border: 2px solid ${theme.darkBlue};
  background-color: ${theme.darkBlue};
  color: ${theme.white};
  font-size: 1rem;
  resize: vertical;
  min-height: 8rem;
  transition: all 120ms ease-in-out;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.silver};
  }

  &::placeholder {
    color: ${theme.fadedWhite};
  }
`;

const StyledButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 0.25rem;
  border: none;
  background-color: ${theme.silver};
  color: ${theme.black};
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 120ms ease-in-out;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 8rem;

  &:hover {
    background-color: ${theme.darkSilver};
  }

  &:disabled {
    background-color: ${theme.fadedWhite};
    cursor: not-allowed;
  }
`;

const StyledHeading = styled.h1`
  font-family: ${() => kodchasan.style.fontFamily};
  font-weight: 500;
  font-size: 2rem;
  color: ${theme.white};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const StyledSuccessMessage = styled.div`
  background-color: ${theme.darkBlue};
  color: ${theme.white};
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  text-align: center;
  border: 2px solid ${theme.silver};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
`;

const StyledLoaderDot = styled.div<{ delay: string }>`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${theme.black};
  border-radius: 50%;
  animation: ${bounce} 0.5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
`;

const StyledLink = styled.a`
  color: ${theme.silver};
  text-decoration: none;
  transition: all 120ms ease-in-out;

  &:hover {
    color: ${theme.black};
  }
`;

export default Contact;
