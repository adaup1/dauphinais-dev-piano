import { WhiteKey } from "./keys/WhiteKey";
import { BlackKey } from "./keys/BlackKey";

export const Keyboard = () => {
  return (
    <>
      <WhiteKey name="About" href="/" note="B" hideTopGradient />
      <WhiteKey name="Experience" href="/experience" note="A" />
      <WhiteKey name="Portfolio" href="/portfolio" note="G" />
      <WhiteKey name="Contact" href="/contact" note="F" hideBottomGradient />
      <BlackKey note="Bb" />
      <BlackKey note="Ab" />
      <BlackKey note="Gb" />
    </>
  );
};
