"use client";

import Image from "next/image";
import Link from "next/link";
import InstagramPhoneMockup from "@/components/InstagramPhoneMockup";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 bg-brand-charcoal min-h-screen">
      {/* Elegante Header della Pagina - Giallo */}
      <div className="bg-brand-nude py-16 md:py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-charcoal/70 mb-3">
            {t("about.badge")}
          </h1>
          <div className="relative flex justify-center w-full">
            <Image 
              src="/assets/images/chiaralulli.png" 
              alt="Chiara Lulli" 
              width={800} 
              height={260} 
              className="w-auto h-24 sm:h-32 md:h-40 lg:h-44 max-w-[90vw] object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Testo di Presentazione */}
          <div className="lg:col-span-7">
            <div className="space-y-6 text-brand-nude/90 text-lg leading-relaxed">
              <p>
                {t("about.p1")}
              </p>
              <p>
                {t("about.p2")}
              </p>
              <p>
                {t("about.p3")}
              </p>
              <p className="font-cursive text-3xl text-brand-gold pt-6 border-t border-brand-rose/30 mt-10">
                "{t("about.quote")}"
              </p>
            </div>
            <div className="mt-10">
              <Link href="/services" className="btn-primary inline-block bg-brand-nude text-brand-charcoal hover:bg-white hover:text-brand-charcoal border-none shadow-md">
                {t("about.cta")}
              </Link>
            </div>
          </div>

          {/* Video Mockup iPhone / Instagram Reels with 3D Parallax Tilt */}
          <div className="lg:col-span-5 flex justify-center">
            <ParallaxCard maxTiltDeg={9} maxTranslatePx={8} className="w-full flex justify-center">
              <InstagramPhoneMockup videoSrc="/assets/videos/presentazione.mp4" />
            </ParallaxCard>
          </div>

        </div>
      </div>
      
      <section className="bg-brand-nude py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-brand-gold mb-4">
            {t("about.welcomeBadge")}
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-8">
            {t("about.welcomeHeading")}
          </h3>
          <p className="text-lg text-brand-charcoal/80 mb-6 leading-relaxed">
            {t("about.welcomeP1")}
          </p>
          <p className="text-lg text-brand-charcoal/80 mb-6 leading-relaxed">
            {t("about.welcomeP2")}
          </p>
          <p className="text-lg text-brand-charcoal/80 leading-relaxed">
            {t("about.welcomeP3")}
          </p>
        </div>
      </section>
    </div>
  );
}
