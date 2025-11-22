
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { StoreInitializer } from "@/components/store-initializer";
import ReactQueryProvider from "@/lib/providers/react-query-provider";

export const metadata = {
  title: "thelocals.co",
  description: "Need a reliable electrician, plumber, AC technician, or installation helper? Locals connects you with friendly, skilled professionals right in your neighborhood",
  generator: "thelocals.co",
  keywords: "locals, electrician, plumber, AC technician, installation helper, maid, cook, ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <ReactQueryProvider>
          <StoreInitializer />
          {children}
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
