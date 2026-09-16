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
    <ParallaxCard delay={delay} maxTiltDeg={5} maxTranslatePx={5} className="h-full">
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative h-[440px] rounded-3xl overflow-hidden shadow-lg border-2 border-brand-charcoal/20 bg-brand-charcoal select-none transition-all duration-500 hover:shadow-2xl hover:border-brand-charcoal/50"
      >
        {/* Background Media */}
        <div className="absolute inset-0 w-full h-full">
          {activeMedia.type === "video" ? (
            <video 
              key={activeMedia.src}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            >
              <source src={activeMedia.src} type="video/mp4" />
            </video>
          ) : (
            <Image 
              src={activeMedia.src} 
              alt={activeMedia.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>

        {/* Top Category Badge & Slide Counter */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-brand-charcoal/80 backdrop-blur-md text-[#f4e47c] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            {item.categoryLabel}
          </span>

          {totalSlides > 1 && (
            <span className="bg-black/60 backdrop-blur-md text-white/90 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-sm">
              {currentSlide + 1} / {totalSlides}
            </span>
          )}
        </div>

        {/* Navigation Arrows for Scrolling Videos (Desktop & Mobile) */}
        {totalSlides > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Video Precedente"
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg border border-white/15"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Video Successivo"
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg border border-white/15"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Slide Indicator Dots at bottom */}
        {totalSlides > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-auto">
            {item.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => goToSlide(idx, e)}
                aria-label={`Vai al video ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx 
                    ? "w-6 bg-[#f4e47c] shadow-sm" 
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover Overlay with 'Prenota questo risultato' */}
        <Link 
          href={`/book?service=${encodeURIComponent(item.serviceToBook)}`}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col justify-end p-6 text-left cursor-pointer"
        >
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2 mb-6">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-brand-nude/90 leading-relaxed line-clamp-2">
              {activeMedia.desc || item.subtitle}
            </p>
            
            {/* CTA Button */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-[#f4e47c] text-[#5e1122] font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-xl shadow-xl hover:bg-white hover:text-brand-charcoal transition-all group-hover:scale-105">
                <CalendarPlus className="w-4 h-4" />
                {t("portfolio.bookResult")}
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </span>
            </div>
          </div>
        </Link>
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
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                activeCategoryId === cat.id 
                  ? "bg-brand-charcoal text-[#f4e47c] shadow-md scale-105 ring-2 ring-brand-charcoal/20" 
                  : "bg-white/80 text-brand-charcoal hover:bg-white hover:shadow-md border border-brand-charcoal/10"
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

