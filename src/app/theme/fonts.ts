import { DM_Sans, Kodchasan } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const kodchasan = Kodchasan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
