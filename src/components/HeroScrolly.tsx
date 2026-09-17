"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroScrolly() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedProgress, setLoadedProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Total frames extracted by python script
  const TOTAL_FRAMES = 243; 
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let loadedCount = 0;
    const framesToLoad = TOTAL_FRAMES;
    
    // Preload images
    for (let i = 0; i < framesToLoad; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `/assets/hero-frames/frame_${paddedIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        setLoadedProgress(Math.floor((loadedCount / framesToLoad) * 100));
        
        if (loadedCount === framesToLoad || loadedCount > 40) {
          // Allow starting once we have a decent chunk of frames
          if (!isLoaded && loadedCount > 40) {
            setIsLoaded(true);
            renderFrame(0);
          }
        }
      };
      
      img.onerror = () => {
        // If we hit the end of extracted frames early, just stop loading more
        console.log("Stopped loading at frame", i);
      };

      imagesRef.current[i] = img;
    }

    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth !== 0) {
        // Draw to cover the canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          // On mobile portrait, offset Y slightly to position the animated hand right in the visual focal zone
          const isMobile = window.innerWidth < 768;
          offsetY = isMobile ? -canvas.height * 0.05 : 0;
        } else {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(0);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // init size

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      let progress = scrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Map progress to frame index
      const maxAvailableFrame = imagesRef.current.filter(img => img.complete && img.naturalWidth !== 0).length - 1;
      if (maxAvailableFrame > 0) {
        const frameIndex = Math.floor(progress * maxAvailableFrame);
        
        // Use requestAnimationFrame for smooth drawing
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          renderFrame(frameIndex);
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

  return (
    <section ref={containerRef} className="relative w-full bg-brand-nude" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-brand-nude">
        
        {/* Loader while frames are fetching */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-brand-charcoal bg-brand-nude">
            <div className="w-10 h-10 border-3 border-brand-charcoal border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80">
              {t("hero.loading")} {loadedProgress}%
            </p>
          </div>
        )}

        {/* Video Canvas Backdrop */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-95 pointer-events-none"
        />
        
        {/* Subtle Edge Vignettes */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-brand-nude via-brand-nude/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-brand-nude via-brand-nude/70 to-transparent z-10 pointer-events-none"></div>

        {/* Brand Header: On mobile, 'Chiara Lulli' at top + logo; On PC, in sovraimpressione over frames */}
        <div className="absolute top-[20vh] sm:top-[22vh] md:top-[35vh] lg:top-[38vh] w-full flex flex-col items-center justify-center z-20 pointer-events-none px-4 sm:px-6">
          {/* Mobile Signature at Top */}
          <div className="block md:hidden w-full max-w-[190px] sm:max-w-[240px] flex justify-center mb-3 sm:mb-5">
            <Image 
              src="/assets/images/chiaralulli.png" 
              alt="Chiara Lulli" 
              width={1024} 
              height={177} 
              className="w-full h-auto object-contain drop-shadow-sm"
              priority
            />
          </div>

          {/* Large Logo: Fills the yellow center area on mobile & in sovraimpressione on PC */}
          <div className="flex justify-center w-full">
            <Image 
              src="/assets/images/logo-new-rev2.png" 
              alt="Beauty Dreamer Logo" 
              width={700} 
              height={250} 
              className="w-full max-w-[310px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[560px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Scroll down indicator for mobile */}
        <div className="hidden sm:flex md:hidden absolute top-28 right-4 z-20 items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-brand-charcoal/60 bg-brand-nude/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-brand-charcoal/10">
          <span>Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Mobile-Optimized Glassmorphic Hero Card with Parallax Tilt Effect (Raised on PC) */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-16 lg:bottom-20 inset-x-3 sm:inset-x-6 md:left-10 lg:left-16 md:right-auto md:max-w-xl z-30 pointer-events-auto">
          <ParallaxCard maxTiltDeg={7} maxTranslatePx={7} className="w-full">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 transition-all">
              <div className="relative z-10">
                
                {/* Title with High-Contrast Typography */}
                <div className="mb-1.5 sm:mb-2.5">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-brand-charcoal leading-tight tracking-wide">
                    {t("hero.title1")}{" "}
                    <span className="font-cursive italic block sm:inline text-brand-charcoal font-normal text-2xl sm:text-3xl md:text-4xl ml-1">
                      — {t("hero.title2")}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-brand-charcoal/85 mb-3.5 sm:mb-4 leading-relaxed font-medium">
                  {t("hero.desc")}
                </p>

                {/* CTA Buttons: 2-column mobile grid / flex on desktop for ergonomic one-thumb access */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3.5 items-center w-full sm:w-auto">
                  <Link 
                    href="/book" 
                    className="btn-primary text-center py-2.5 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center rounded-xl"
                  >
                    {t("hero.bookBtn")}
                  </Link>
                  <Link 
                    href="/services" 
                    className="btn-secondary text-center py-2.5 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md border-brand-charcoal/40 hover:bg-brand-charcoal hover:text-brand-nude shadow-sm hover:shadow-md transition-all flex items-center justify-center rounded-xl"
                  >
                    {t("hero.servicesBtn")}
                  </Link>
                </div>

              </div>
            </div>
          </ParallaxCard>
        </div>

      </div>
    </section>
  );
}
