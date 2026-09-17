"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, CalendarPlus } from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

interface MediaSlide {
  type: "video" | "image";
  src: string;
  title: string;
  desc?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  categoryId: "primadopo" | "ricostruzione" | "nailart";
  categoryLabel: string;
  serviceToBook: string;
  slides: MediaSlide[];
}

function PortfolioCard({ item, delay }: { item: PortfolioItem; delay: number }) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = item.slides.length;

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const activeMedia = item.slides[currentSlide];

  return (
    <ParallaxCard delay={delay} maxTiltDeg={4} maxTranslatePx={6} className="h-full">
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative h-full rounded-[2.5rem] p-4 sm:p-5 bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.07),inset_0_2px_4px_rgba(255,255,255,0.8)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15),inset_0_2px_8px_rgba(255,255,255,1)] hover:-translate-y-2 transition-all duration-500 flex flex-col select-none"
      >
        {/* Top Media Container */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-[1.8rem] overflow-hidden bg-brand-charcoal/5 shadow-inner">
          {/* Background Media */}
          <div className="absolute inset-0 w-full h-full">
            {activeMedia.type === "video" ? (
              <video 
                key={activeMedia.src}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              >
                <source src={activeMedia.src} type="video/mp4" />
              </video>
            ) : (
              <Image 
                src={activeMedia.src} 
                alt={activeMedia.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            )}
          </div>

          {/* Top Category Badge & Slide Counter */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-md text-brand-charcoal text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/60 shadow-sm">
              <Sparkles className="w-3 h-3" />
              {item.categoryLabel}
            </span>

            {totalSlides > 1 && (
              <span className="bg-brand-charcoal/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                {currentSlide + 1} / {totalSlides}
              </span>
            )}
          </div>

          {/* Navigation Arrows for Scrolling Videos (Desktop & Mobile) */}
          {totalSlides > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prevSlide}
                aria-label="Video Precedente"
                className="pointer-events-auto w-8 h-8 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md text-brand-charcoal flex items-center justify-center transition-all shadow-md border border-white/60"
              >
                <ChevronLeft className="w-4 h-4 ml-[-2px]" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Video Successivo"
                className="pointer-events-auto w-8 h-8 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md text-brand-charcoal flex items-center justify-center transition-all shadow-md border border-white/60"
              >
                <ChevronRight className="w-4 h-4 mr-[-2px]" />
              </button>
            </div>
          )}

          {/* Slide Indicator Dots at bottom */}
          {totalSlides > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-auto">
              {item.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => goToSlide(idx, e)}
                  aria-label={`Vai al video ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? "w-5 bg-white shadow-sm" 
                      : "w-1.5 bg-white/50 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text & CTA Container */}
        <div className="pt-6 pb-2 px-3 flex-grow flex flex-col justify-between">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-charcoal leading-snug mb-2.5">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed line-clamp-2">
              {activeMedia.desc || item.subtitle}
            </p>
          </div>

          <Link 
            href={`/book?service=${encodeURIComponent(item.serviceToBook)}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-transparent border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-nude font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition-all duration-300"
          >
            <CalendarPlus className="w-4 h-4" />
            {t("portfolio.bookResult")}
          </Link>
        </div>
      </div>
    </ParallaxCard>
  );
}

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const categories = [
    { id: "all", label: t("portfolio.tabAll") },
    { id: "primadopo", label: t("portfolio.tabPrimaDopo") },
    { id: "ricostruzione", label: t("portfolio.tabRicostruzione") },
    { id: "nailart", label: t("portfolio.tabNailArt") },
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: "primadopo-master",
      title: "Prima & Dopo: Correzione & Ricostruzione",
      subtitle: "Trasformazione unghie da onicofagia a lunghezza uniforme con struttura in Gel ultra-resistente.",
      categoryId: "primadopo",
      categoryLabel: t("portfolio.tabPrimaDopo"),
      serviceToBook: "Ricostruzione Gel/Acrygel",
      slides: [
        { 
          type: "video", 
          src: "/assets/video/prima-dopo1.mp4", 
          title: "Trasformazione 1", 
          desc: "Correzione lamina e allungamento naturale con gel ad alta tenuta." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo2.mp4", 
          title: "Trasformazione 2", 
          desc: "Rifinitura mandorla classica e pulizia profonda delle cuticole." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo3.mp4", 
          title: "Trasformazione 3", 
          desc: "Dry manicure russa e stesura del colore sotto cuticola." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo4.mp4", 
          title: "Trasformazione 4", 
          desc: "Refill dopo 4 settimane: tenuta perfetta e zero sollevamenti." 
        },
      ]
    },
    {
      id: "ricostruzione-gel",
      title: "Ricostruzione Strutturale & Refill",
      subtitle: "Allungamento con formina, curvatura a C perfetta e finitura brillante a specchio.",
      categoryId: "ricostruzione",
      categoryLabel: t("portfolio.tabRicostruzione"),
      serviceToBook: "Ricostruzione Gel/Acrygel",
      slides: [
        { 
          type: "video", 
          src: "/assets/video/2.mp4", 
          title: "Lavorazione Gel", 
          desc: "Modellatura di precisione e bombatura per una resistenza impeccabile." 
        },
        { 
          type: "image", 
          src: "/assets/images/unghia-inserire-come-dorazione-sito2.png", 
          title: "Risultato Ricostruzione", 
          desc: "Unghie eleganti, proporzionate e confortevoli per la vita di tutti i giorni." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo2.mp4", 
          title: "Dettaglio Forma", 
          desc: "Linee pulite e superficie perfettamente levigata." 
        },
      ]
    },
    {
      id: "dry-manicure-russo",
      title: "Dry Manicure & Semipermanente",
      subtitle: "Giro cuticola impeccabile e colore intenso steso a millimetro per prolungare la durata.",
      categoryId: "primadopo",
      categoryLabel: t("portfolio.tabPrimaDopo"),
      serviceToBook: "Dry Manicure",
      slides: [
        { 
          type: "video", 
          src: "/assets/video/prima-dopo3.mp4", 
          title: "Dry Manicure Step 1", 
          desc: "Pulizia a secco con micromotore e punte diamantate delicate." 
        },
        { 
          type: "video", 
          src: "/assets/video/1.mp4", 
          title: "Applicazione Colore", 
          desc: "Applicazione semipermanente rinforzato con rubber base." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo1.mp4", 
          title: "Risultato Finale", 
          desc: "Mani curate, cuticole idratate e lucentezza fino a 4 settimane." 
        },
      ]
    },
    {
      id: "nailart-creativa",
      title: "Nail Art d'Autore & Dettagli Oro",
      subtitle: "French micro, sfumature babyboomer e decorazioni a mano libera per uno stile ricercato.",
      categoryId: "nailart",
      categoryLabel: t("portfolio.tabNailArt"),
      serviceToBook: "Nail Art",
      slides: [
        { 
          type: "image", 
          src: "/assets/images/unghia-inserire-come-dorazione-sito1.png", 
          title: "Dettagli Artistici", 
          desc: "Linee sottili a mano libera e riflessi d'oro personalizzati." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo4.mp4", 
          title: "Babyboomer Elegance", 
          desc: "Sfumatura morbida nude-to-white con sigillante extra gloss." 
        },
        { 
          type: "video", 
          src: "/assets/video/2.mp4", 
          title: "Micro Decorazioni", 
          desc: "Applicazione cristalli Swarovski e lamine metalliche." 
        },
      ]
    },
    {
      id: "refill-manutenzione",
      title: "Refill Mensile & Salute dell'Unghia",
      subtitle: "Trattamento curativo periodico per preservare la salute della lamina naturale.",
      categoryId: "ricostruzione",
      categoryLabel: t("portfolio.tabRicostruzione"),
      serviceToBook: "Ritocco Mensile",
      slides: [
        { 
          type: "video", 
          src: "/assets/video/prima-dopo4.mp4", 
          title: "Refill 4 Settimane", 
          desc: "Controllo crescita, smontaggio delicato e nuova applicazione." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo2.mp4", 
          title: "Ribilanciamento", 
          desc: "Ripristino del baricentro strutturale dell'unghia." 
        },
      ]
    },
    {
      id: "pedicure-estetico",
      title: "Pedicure & Cura Rigenerante",
      subtitle: "Trattamento senza lame per piedi morbidi, levigati e cuticole rifinite.",
      categoryId: "primadopo",
      categoryLabel: t("portfolio.tabPrimaDopo"),
      serviceToBook: "Pedicure Senza Lame",
      slides: [
        { 
          type: "video", 
          src: "/assets/video/prima-dopo3.mp4", 
          title: "Pedicure Senza Lame", 
          desc: "Cura avanzata e non invasiva per talloni e unghie dei piedi." 
        },
        { 
          type: "video", 
          src: "/assets/video/prima-dopo1.mp4", 
          title: "Risultato Rigenerante", 
          desc: "Benessere completo e semipermanente a lunga durata." 
        },
      ]
    }
  ];

  const filteredItems = activeCategoryId === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.categoryId === activeCategoryId);

  return (
    <div className="pt-20 bg-brand-nude min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">
          {t("portfolio.title")}
        </h1>
        <p className="text-brand-charcoal/80 max-w-2xl mx-auto text-lg mb-6">
          {t("portfolio.subtitle")}
        </p>

        <p className="text-xs font-semibold tracking-wider uppercase text-brand-charcoal/60 mb-10 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t("portfolio.swipeTip")}
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                activeCategoryId === cat.id 
                  ? "bg-white/60 backdrop-blur-md text-brand-charcoal border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.8)] scale-105" 
                  : "bg-transparent text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-white/30 border border-brand-charcoal/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <PortfolioCard key={item.id} item={item} delay={idx * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}

