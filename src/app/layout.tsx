import type { Metadata } from "next";
import { redHatDisplay } from "./theme/fonts";
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
      <body className={`${redHatDisplay.className} antialiased`}>
        <Header />
        <PaneContainer>
          <Pane side="left">
            <Menu />
          </Pane>
          <Pane side="right">
            <Container>{children}</Container>
          </Pane>
        </PaneContainer>
        <Footer />
      </body>
    </html>
  );
}
