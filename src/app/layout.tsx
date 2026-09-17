import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeautyDreamer | Manicure & Nail Art Specialist",
  description: "BeautyDreamer di Chiara Lulli. Un'esperienza di bellezza per valorizzare la tua femminilità. Specialista in Manicure, Nail Art e Consulenza Beauty a Milano City Life.",
  openGraph: {
    title: "BeautyDreamer | Nail Art Specialist",
    description: "Scopri i trattamenti di Chiara Lulli a Milano City Life.",
    url: "https://beautydreamer.it",
    siteName: "BeautyDreamer",
    images: [
      {
        url: "/assets/images/logo-new-rev2.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${cormorant.variable} ${jakarta.variable} ${alexBrush.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
