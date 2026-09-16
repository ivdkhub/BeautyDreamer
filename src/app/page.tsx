"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

import HeroScrolly from "@/components/HeroScrolly";
import VieniScrolly from "@/components/VieniScrolly";
import ParallaxCard from "@/components/ParallaxCard";
import InstagramPhoneMockup from "@/components/InstagramPhoneMockup";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const servicesData = [
    { 
      title: t("srvPrev.manicureTitle"), 
      desc: t("srvPrev.manicureDesc"), 
      img: "unghia-inserire-come-dorazione-sito1.png", 
      textTop: true 
    },
    { 
      title: t("srvPrev.ricostruzioneTitle"), 
      desc: t("srvPrev.ricostruzioneDesc"), 
      img: "unghia-inserire-come-dorazione-sito2.png", 
      textTop: false 
    },
    { 
      title: t("srvPrev.nailArtTitle"), 
      desc: t("srvPrev.nailArtDesc"), 
      img: "nail-art.png", 
      textTop: false 
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroScrolly />

      {/* Intro Section */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-brand-nude">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex justify-center w-full">
            <ParallaxCard maxTiltDeg={8} maxTranslatePx={8} className="w-full flex justify-center">
              <InstagramPhoneMockup videoSrc="/assets/videos/123.mp4" />
            </ParallaxCard>
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-brand-charcoal/70 mb-2">
              {t("intro.badge")}
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-charcoal mb-4 sm:mb-6 leading-tight">
              {t("intro.heading")}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-brand-charcoal/85 mb-4 sm:mb-6 leading-relaxed">
              {t("intro.p1")}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-brand-charcoal/85 mb-6 sm:mb-8 leading-relaxed">
              {t("intro.p2")}
            </p>
            <Link href="/about" className="inline-flex items-center text-brand-charcoal font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity group text-sm sm:text-base">
              {t("intro.myStory")} 
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vieni a trovarci Scrollytelling */}
      <VieniScrolly />

      {/* Services Preview */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-brand-nude">
        <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-charcoal/70 mb-2">
            {t("srvPrev.badge")}
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-charcoal">
            {t("srvPrev.heading")}
          </h3>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((srv, idx) => (
            <ParallaxCard key={idx} delay={idx * 0.1} maxTiltDeg={8} maxTranslatePx={8} className="h-full">
              <div className="group cursor-pointer bg-brand-nude/70 backdrop-blur-xs rounded-2xl sm:rounded-3xl border-2 border-brand-charcoal/15 hover:border-brand-charcoal/40 transition-all shadow-sm hover:shadow-xl h-full flex flex-col justify-between overflow-hidden relative min-h-[380px] sm:min-h-[440px]">
                
                {srv.textTop ? (
                  <>
                    <div className="p-5 sm:p-7 pb-0 relative z-10">
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-brand-charcoal mb-1.5 sm:mb-2">{srv.title}</h4>
                      <p className="text-brand-charcoal/80 text-xs sm:text-sm leading-relaxed">{srv.desc}</p>
                    </div>
                    <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-transparent mt-auto">
                      <Image 
                        src={`/assets/images/${srv.img}`}
                        alt={srv.title}
                        fill
                        className="object-contain object-right-bottom scale-115 sm:scale-125 translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3 group-hover:scale-130 transition-transform duration-700 mix-blend-multiply pointer-events-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-transparent">
                      <Image 
                        src={`/assets/images/${srv.img}`}
                        alt={srv.title}
                        fill
                        className="object-contain object-right-top scale-115 sm:scale-125 translate-x-2 sm:translate-x-3 -translate-y-2 group-hover:scale-130 transition-transform duration-700 mix-blend-multiply pointer-events-none"
                      />
                    </div>
                    <div className="p-5 sm:p-7 pt-2 relative z-10 mt-auto">
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-brand-charcoal mb-1.5 sm:mb-2">{srv.title}</h4>
                      <p className="text-brand-charcoal/80 text-xs sm:text-sm leading-relaxed">{srv.desc}</p>
                    </div>
                  </>
                )}

              </div>
            </ParallaxCard>
          ))}
        </div>
        
        <div className="text-center mt-10 sm:mt-12">
          <Link href="/services" className="btn-secondary py-2.5 px-6 sm:py-3 sm:px-8 text-xs sm:text-sm rounded-xl inline-block">
            {t("srvPrev.allServicesBtn")}
          </Link>
        </div>
      </section>

      {/* Testimonials snippet */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-brand-nude/80 border-t border-brand-charcoal/10 text-brand-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-5 sm:mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-brand-charcoal fill-brand-charcoal w-5 h-5 sm:w-6 sm:h-6 mx-0.5 sm:mx-1" />)}
          </div>
          <p className="text-lg sm:text-2xl font-serif italic mb-6 sm:mb-8 leading-relaxed">
            "{t("testimonials.quote")}"
          </p>
          <p className="font-semibold uppercase tracking-wider text-xs sm:text-sm text-brand-charcoal/80">
            {t("testimonials.author")}
          </p>
        </div>
      </section>
    </div>
  );
}
