
import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreInitializer } from "@/components/store-initializer";
import ReactQueryProvider from "@/lib/providers/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <StoreInitializer />
            <main className="fade-in">
              {children}
            </main>
            <Analytics />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
