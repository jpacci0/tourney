import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Roboto_Mono } from "next/font/google";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import "./globals.css";

// const inter = Inter({subsets: ["latin"]});
const robotoMono = Roboto_Mono({
  // weight: '400',
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Life Gaming",
    default: "Life Gaming",
  },
  description: "Compete in tournaments and improve your skills in your favorite game.",
  keywords: ["gaming", "tournaments", "esports", "call of duty", "warzone"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body
        className={`px-2 md:px-4 xl:px-10 2xl:px-48 bg-gray-950 antialiased flex flex-col h-screen`}
      >
        <Navbar />
        <div className="flex-1">
          {children}
          <SpeedInsights />
          <Analytics />
        </div>
        <Footer />
      </body>
    </html>
  );
}
