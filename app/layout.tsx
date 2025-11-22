import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "thelocals.co",
  description: "Need a reliable electrician, plumber, AC technician, or installation helper? Locals connects you with friendly, skilled professionals right in your neighborhood",
  generator: "thelocals.co",
  keywords: "locals, electrician, plumber, AC technician, installation helper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
