import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Slippage from a fixture book',
  description: 'Walk asks you already have. Not an Alcor quote and not a swap.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
