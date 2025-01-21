import type { Metadata, Viewport } from "next";
import { dmSans } from "./theme/fonts";
import "./globals.css";
import { PaneContainer, Header, Footer } from "./components/views";

export const metadata: Metadata = {
  title: "Dauphinais.dev",
  description: "The development portfolio of Andrew Dauphinais",
};

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <Header />
        <PaneContainer>{children}</PaneContainer>
        <Footer />
      </body>
    </html>
  );
}
