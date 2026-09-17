"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Gift, CreditCard, Sparkles } from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

export default function GiftScrolly() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [loadedProgress, setLoadedProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Total frames extracted by python script for gift-animation2.mp4
  const TOTAL_FRAMES = 239; 
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const framesToLoad = TOTAL_FRAMES;
    
    // Preload images
    for (let i = 0; i < framesToLoad; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `/assets/gift-frames/frame_${paddedIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        setLoadedProgress(Math.floor((loadedCount / framesToLoad) * 100));
        
        if (loadedCount === framesToLoad || loadedCount > 40) {
          if (!isLoaded && loadedCount > 40) {
            setIsLoaded(true);
          }
        }
      };
      
      img.onerror = () => {
        console.log("Stopped loading at frame", i);
      };

      imagesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth !== 0) {
        const imgRatio = img.width / img.height;
        
        // Make the video cover the entire window
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const updateCardVisibility = (progress: number) => {
      if (cardContainerRef.current) {
        // Appare dopo il 45% dello scroll
        if (progress > 0.45) {
          cardContainerRef.current.classList.remove('opacity-0', 'translate-y-16', 'pointer-events-none');
          cardContainerRef.current.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
          cardContainerRef.current.classList.add('opacity-0', 'translate-y-16', 'pointer-events-none');
          cardContainerRef.current.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (!containerRef.current) {
        renderFrame(0);
        return;
      }
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      let progress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;
      progress = Math.max(0, Math.min(1, progress));
      const maxAvailableFrame = imagesRef.current.filter(img => img.complete && img.naturalWidth !== 0).length - 1;
      const frameIndex = maxAvailableFrame > 0 ? Math.floor(progress * maxAvailableFrame) : 0;
      
      renderFrame(frameIndex);
      updateCardVisibility(progress);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      let progress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;
      progress = Math.max(0, Math.min(1, progress));

      const maxAvailableFrame = imagesRef.current.filter(img => img.complete && img.naturalWidth !== 0).length - 1;
      if (maxAvailableFrame > 0) {
        const frameIndex = Math.floor(progress * maxAvailableFrame);
        
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          renderFrame(frameIndex);
          updateCardVisibility(progress);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  const giftCards = [
    { amount: "50€", desc: "Pensiero Elegante" },
    { amount: "100€", desc: "Rituale di Bellezza" },
    { amount: "200€", desc: "Esperienza Luxury" },
    { amount: "Trattamenti", desc: "Scegli un servizio", isCustom: true }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#d5d4ca]" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#d5d4ca] flex flex-col items-center justify-center">
        
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-brand-charcoal bg-[#d5d4ca]">
            <div className="w-10 h-10 border-3 border-brand-charcoal border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80">
              Caricamento... {loadedProgress}%
            </p>
          </div>
        )}

        {/* Video Canvas Full Background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-90 pointer-events-none object-cover"
        />
        
        {/* Gradients to blend edges */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-[#d5d4ca] via-[#d5d4ca]/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-[#d5d4ca] via-[#d5d4ca]/70 to-transparent z-10 pointer-events-none"></div>

        <div className="hidden sm:flex md:hidden absolute top-48 right-4 z-20 items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-brand-charcoal/60 bg-[#d5d4ca]/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-brand-charcoal/10">
          <span>Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Floating Centered Glass Card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4 sm:px-6 md:px-8 pt-36 md:pt-48 pb-6">
          <div ref={cardContainerRef} className="w-full max-w-5xl transition-all duration-1000 ease-out opacity-0 translate-y-16 pointer-events-none">
            <ParallaxCard maxTiltDeg={3} maxTranslatePx={6} className="w-full">
              <div className="glass-card rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 transition-all shadow-2xl bg-white/40 backdrop-blur-md border border-white/40">
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
                    <Gift className="w-10 h-10 md:w-12 md:h-12 text-brand-charcoal" />
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal font-semibold">Scegli il tuo regalo</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12 w-full">
                    {giftCards.map((card, idx) => (
                      <Link 
                        key={idx}
                        href="/book"
                        className="group flex flex-col items-center justify-center bg-white/70 hover:bg-brand-charcoal hover:text-brand-nude border border-white/50 hover:border-brand-charcoal py-6 px-3 md:py-10 md:px-4 rounded-2xl md:rounded-3xl transition-all duration-300 text-brand-charcoal shadow-sm hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer backdrop-blur-md w-full overflow-hidden"
                      >
                        {card.isCustom ? <Sparkles className="w-10 h-10 md:w-14 md:h-14 mb-3 md:mb-4 opacity-80 shrink-0" /> : <CreditCard className="w-10 h-10 md:w-14 md:h-14 mb-3 md:mb-4 opacity-80 shrink-0" />}
                        <span className={`font-serif font-bold text-center max-w-full break-words leading-tight ${card.amount.length > 5 ? 'text-2xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'}`}>
                          {card.amount}
                        </span>
                        <span className="text-[10px] sm:text-xs md:text-sm font-sans tracking-wide uppercase opacity-80 text-center mt-2 md:mt-3 px-1">{card.desc}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="text-center w-full mx-auto bg-white/50 backdrop-blur-md py-3 px-6 rounded-full border border-white/50 shadow-sm max-w-2xl">
                    <p className="text-sm md:text-base font-medium text-brand-charcoal/90">La Gift Card digitale verrà inviata via email con le istruzioni per utilizzarla al momento della prenotazione.</p>
                  </div>
                </div>
              </div>
            </ParallaxCard>
          </div>
        </div>
      </div>
    </section>
  );
}
