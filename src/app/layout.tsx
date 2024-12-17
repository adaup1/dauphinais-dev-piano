import type { Metadata } from "next";
import { dmSans } from "./theme/fonts";
import "./globals.css";
import {
  Pane,
  PaneContainer,
  Header,
  Container,
  Footer,
} from "./components/views";
import { Menu } from "./components/menu";

export const metadata: Metadata = {
  title: "Dauphinais.dev",
  description: "The development portfolio of Andrew Dauphinais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <Header />
        <PaneContainer>
          <Pane side="left">
            <Menu />
          </Pane>
          <Pane side="right">{children}</Pane>
        </PaneContainer>
        <Footer />
      </body>
    </html>
  );
}
