"use client";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

export default function VieniScrolly() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Total frames extracted by python script
  const TOTAL_FRAMES = 150; 
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
      img.src = `/assets/vieni-frames/frame_${paddedIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === framesToLoad || loadedCount > 40) {
          if (!isLoaded && loadedCount > 40) {
            setIsLoaded(true);
            renderFrame(0);
          }
        }
      };
      
      img.onerror = () => {
        // Handle end of frames safely
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

      setScrollProgress(progress);

      // Map progress to frame index
      const maxAvailableFrame = imagesRef.current.filter(img => img.complete && img.naturalWidth !== 0).length - 1;
      if (maxAvailableFrame > 0) {
        const frameIndex = Math.floor(progress * maxAvailableFrame);
        
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

  const isCardVisible = scrollProgress >= 0.65;

  return (
    <section ref={containerRef} className="relative w-full bg-brand-nude" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-brand-nude flex items-center justify-center">
        
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-85 pointer-events-none"
        />
        
        {/* Gradient overlays to smooth harsh edges of the video frames */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-brand-nude via-brand-nude/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-brand-nude via-brand-nude/70 to-transparent z-10 pointer-events-none"></div>

        {/* Content overlay with 3D Parallax Tilt: only reveals after ~65% of the animation is scrolled */}
        <div className={`relative z-20 px-3 sm:px-6 max-w-4xl mx-auto w-full transition-all duration-700 ease-out ${
          isCardVisible 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-12 pointer-events-none"
        }`}>
          <ParallaxCard maxTiltDeg={6} maxTranslatePx={6} className="w-full">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 transition-all">
              <div className="relative z-10 text-center flex flex-col items-center">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal mb-3 sm:mb-6 tracking-wide drop-shadow-sm">
                  {t("vieni.title")} <span className="font-cursive italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-charcoal/90 ml-2">{t("vieni.titleAccent")}</span>
                </h2>
                <p className="text-xs sm:text-base md:text-xl text-brand-charcoal/90 mb-5 sm:mb-8 max-w-2xl font-medium drop-shadow-sm leading-relaxed">
                  {t("vieni.desc")}
                </p>
                <Link href="/book" className="btn-primary shadow-lg hover:shadow-xl transition-all py-2.5 px-5 sm:py-3.5 sm:px-8 text-xs sm:text-sm rounded-xl">
                  {t("vieni.cta")}
                </Link>
              </div>
            </div>
          </ParallaxCard>
        </div>
      </div>
    </section>
  );
}
