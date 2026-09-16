import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
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
        className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} antialiased min-h-screen flex flex-col`}
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
