"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  MoreVertical, 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Check, 
  Sparkles, 
  Bookmark, 
  ExternalLink, 
  X 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function InstagramPhoneMockup({ videoSrc = "/assets/videos/presentazione.mp4" }: { videoSrc?: string }) {
  const { t } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(1482);
  const [showInstagramPrompt, setShowInstagramPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/beautydreameraesthetic/";

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePhoneClick = () => {
    setShowInstagramPrompt(true);
  };

  const handleOpenInstagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(INSTAGRAM_PROFILE_URL, "_blank", "noopener,noreferrer");
    setShowInstagramPrompt(false);
  };

  const handleCancelPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInstagramPrompt(false);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] drop-shadow-2xl">
      {/* Outer iPhone Titanium/Gold Casing */}
      <div className="relative p-3.5 bg-gradient-to-b from-[#3a3528] via-[#1e1c18] to-[#2c271d] rounded-[54px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[3px] border-[#8e7a4a]/40 ring-1 ring-white/10">
        
        {/* Side Buttons (Physical simulation) */}
        <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-[#8e7a4a]/60 rounded-l-sm"></div>
        <div className="absolute -left-[5px] top-42 w-[3px] h-12 bg-[#8e7a4a]/60 rounded-l-sm"></div>
        <div className="absolute -left-[5px] top-58 w-[3px] h-12 bg-[#8e7a4a]/60 rounded-l-sm"></div>
        <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-[#8e7a4a]/60 rounded-r-sm"></div>

        {/* Screen Glass Container */}
        <div 
          onClick={handlePhoneClick}
          className="relative aspect-[9/19.5] w-full bg-black rounded-[42px] overflow-hidden shadow-inner border border-white/10 cursor-pointer select-none group"
        >
          {/* Background Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Video Gradient Overlays for Instagram UI Readability */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

          {/* Dynamic Island Pill Notch */}
          <div className="absolute top-3 inset-x-0 flex justify-center z-30 pointer-events-none">
            <div className="w-28 h-7 bg-black rounded-full flex items-center justify-between px-3 border border-white/10 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#0a0a23]/60"></div>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#111] border border-blue-900/30"></div>
            </div>
          </div>

          {/* Instagram Top Bar */}
          <div className="absolute top-12 inset-x-0 px-4 flex justify-between items-center z-20 text-white drop-shadow">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold tracking-wide drop-shadow">Reels</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
                title={t("ig.openBtn")}
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </button>

              <button 
                onClick={toggleSound}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 transition-all"
                title={isMuted ? t("ig.soundOn") : t("ig.soundOff")}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-gold" />}
              </button>
            </div>
          </div>

          {/* Instagram Right Action Bar */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-20 text-white drop-shadow-md">
            {/* Like Button */}
            <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Heart className={`w-6 h-6 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </div>
              <span className="text-[11px] font-medium">{likesCount.toLocaleString()}</span>
            </button>

            {/* Comments */}
            <button onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }} className="flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] font-medium">138</span>
            </button>

            {/* Share */}
            <button onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }} className="flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] font-medium">94</span>
            </button>

            {/* Save / Bookmark */}
            <button onClick={handleSave} className="flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-brand-gold text-brand-gold' : 'text-white'}`} />
              </div>
            </button>

            {/* Options */}
            <button onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }} className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white">
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* Spinning Music Disc */}
            <div className="w-8 h-8 rounded-full border-2 border-white/60 bg-gradient-to-tr from-brand-charcoal to-brand-gold flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-md">
              <Music className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Instagram Bottom Caption & Profile Overlay */}
          <div className="absolute bottom-4 inset-x-0 px-4 z-20 text-white text-left pointer-events-none">
            <div className="flex items-center gap-2.5 mb-2 pointer-events-auto">
              {/* Profile Picture with IG Gradient Ring */}
              <div 
                onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }}
                className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0 shadow-sm cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-full h-full rounded-full bg-black relative overflow-hidden border border-black">
                  <Image
                    src="/assets/images/chiara-lulli (foto-chi siamo).png"
                    alt="Chiara Lulli"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Username + Badge */}
              <div 
                onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }}
                className="flex items-center gap-1.5 cursor-pointer hover:underline"
              >
                <span className="font-semibold text-sm tracking-tight text-white drop-shadow">
                  beautydreameraesthetic
                </span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#0095f6] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
              </div>

              {/* Follow Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setShowInstagramPrompt(true); }}
                className="text-xs font-semibold bg-white/20 hover:bg-white text-white hover:text-black border border-white/60 px-2.5 py-0.5 rounded-md transition-all ml-1 shadow-sm"
              >
                {t("ig.follow")}
              </button>
            </div>

            {/* Caption */}
            <p className="text-xs text-white/90 leading-tight mb-2 drop-shadow line-clamp-2">
              {t("ig.caption")}
            </p>

            {/* Audio Marquee */}
            <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
              <Music className="w-3 h-3 text-brand-gold" />
              <span className="truncate">{t("ig.audio")}</span>
            </div>
          </div>

          {/* iPhone Home Indicator Bar */}
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-30 pointer-events-none">
            <div className="w-32 h-1 bg-white/70 rounded-full shadow-sm"></div>
          </div>

          {/* INSTAGRAM CONFIRMATION POPUP MODAL */}
          {showInstagramPrompt && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-5 text-center transition-all animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="bg-[#1f1f1f] text-white p-6 rounded-3xl border border-white/15 shadow-2xl w-full max-w-[280px] flex flex-col items-center">
                {/* Instagram Gradient Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                  <InstagramIcon className="w-8 h-8 text-white" />
                </div>

                <h4 className="font-serif font-bold text-lg mb-1">{t("ig.openTitle")}</h4>
                <p className="text-xs text-white/70 mb-5 leading-relaxed">
                  {t("ig.openDesc")}
                </p>

                <div className="space-y-2.5 w-full">
                  <button
                    onClick={handleOpenInstagram}
                    className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>{t("ig.openBtn")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCancelPrompt}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-xl text-xs transition-colors border border-white/10"
                  >
                    {t("ig.stayBtn")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
