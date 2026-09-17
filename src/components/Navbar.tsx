"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Settings, Check, Globe, MapPin, Phone, Clock } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.portfolio"), href: "/portfolio" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.faq"), href: "/faq" },
    { name: t("nav.giftCard"), href: "/giftcard" },
  ];

  const languages: { code: Language; label: string; flag: React.ReactNode }[] = [
    { 
      code: "it", 
      label: "Italiano", 
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm object-cover drop-shadow-sm">
          <rect width="1" height="2" fill="#009246"/>
          <rect width="1" height="2" x="1" fill="#ffffff"/>
          <rect width="1" height="2" x="2" fill="#ce2b37"/>
        </svg>
      ) 
    },
    { 
      code: "en", 
      label: "English", 
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm object-cover drop-shadow-sm">
          <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
          <clipPath id="t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/></clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      ) 
    },
    { 
      code: "es", 
      label: "Español", 
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm object-cover drop-shadow-sm">
          <rect width="3" height="2" fill="#c60b1e"/>
          <rect width="3" height="1" y="0.5" fill="#ffc400"/>
        </svg>
      ) 
    },
  ];

  // Close language popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangModalOpen(false);
      }
    }
    if (langModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langModalOpen]);

  // Determine navbar background color based on route
  const isGiftCard = pathname === "/giftcard";
  const navBgColor = isGiftCard ? "#d5d4ca" : "rgb(243, 226, 119)";

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-brand-charcoal/10 transition-colors duration-500" style={{ backgroundColor: navBgColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 w-full">
          
          {/* Mobile Menu Button (Left on Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-charcoal hover:text-brand-charcoal/80 focus:outline-none p-1.5"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Left Spacer (Desktop only) to balance the right button */}
          <div className="hidden md:flex flex-1"></div>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex flex-none items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`relative text-brand-charcoal hover:text-brand-charcoal transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm md:text-base font-sans font-medium tracking-wide uppercase group py-2 ${isActive ? 'font-semibold' : ''}`}
                >
                  {link.name}
                  {/* Hover Bar / Active Bar */}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] bg-brand-charcoal transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: Language Flag + Book Now Button */}
          <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-3">
            
            {/* Language Selection Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangModalOpen(!langModalOpen)}
                className="bg-transparent text-brand-charcoal py-2 px-2 sm:py-3 sm:px-3 hover:text-brand-charcoal/70 transition-all rounded-xl flex items-center justify-center transform hover:scale-105 active:scale-95"
                title={t("nav.selectLang")}
                aria-label={t("nav.selectLang")}
              >
                <span className="text-xl sm:text-2xl leading-none">
                  {languages.find((l) => l.code === language)?.flag || "🇮🇹"}
                </span>
              </button>

              {/* Language Selection Dropdown - Flags Only */}
              {langModalOpen && (
                <div className="absolute right-0 mt-2 bg-brand-nude border-2 border-brand-charcoal/20 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl flex items-center gap-1.5">
                  {languages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangModalOpen(false);
                        }}
                        title={lang.label}
                        aria-label={lang.label}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-2xl transition-all ${
                          isSelected
                            ? "bg-brand-charcoal/20 ring-2 ring-brand-charcoal scale-110 shadow-sm"
                            : "hover:bg-brand-charcoal/10 hover:scale-105 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <span>{lang.flag}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Book Now Button */}
            <Link 
              href="/book" 
              className="bg-transparent text-brand-charcoal font-sans font-semibold tracking-wide uppercase text-xs sm:text-sm py-2 px-3 sm:py-3 sm:px-6 rounded-xl transition-all duration-300 ease-out hover:bg-brand-charcoal hover:text-brand-nude hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border border-transparent hover:border-brand-charcoal"
            >
              {t("nav.bookNow")}
            </Link>

          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-charcoal/10 shadow-2xl absolute w-full transition-colors duration-500" style={{ backgroundColor: navBgColor }}>
          <div className="px-4 pt-4 pb-6 space-y-2 text-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 font-sans font-medium text-base tracking-wide uppercase transition-colors ${isActive ? 'text-brand-charcoal font-semibold bg-brand-charcoal/10 rounded-lg' : 'text-brand-charcoal hover:opacity-80'}`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Language Switcher - Flags Only */}
            <div className="pt-3 pb-2 border-t border-brand-charcoal/15 flex justify-center gap-3">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    title={lang.label}
                    aria-label={lang.label}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl text-2xl transition-all ${
                      isSelected
                        ? "bg-brand-charcoal/20 ring-2 ring-brand-charcoal scale-110 shadow-md"
                        : "bg-brand-charcoal/10 hover:bg-brand-charcoal/20 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span>{lang.flag}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4">
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="inline-block w-full bg-transparent text-brand-charcoal font-sans font-semibold tracking-wide uppercase py-3 rounded-xl text-center transition-all duration-300 ease-out hover:bg-brand-charcoal hover:text-brand-nude hover:shadow-lg active:scale-95 border border-transparent hover:border-brand-charcoal"
              >
                {t("nav.bookNow")}
              </Link>
            </div>

            {/* Mobile Contact & Hours Info */}
            <div className="pt-8 pb-4 mt-4 border-t border-brand-charcoal/15 flex flex-col items-center space-y-6">
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-brand-charcoal mb-2">
                  <MapPin size={18} />
                  <span className="font-semibold tracking-wide uppercase text-xs">Dove siamo</span>
                </div>
                <p className="text-sm text-brand-charcoal/80 font-medium">Via dell'Estetica 12, Milano</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-brand-charcoal mb-2">
                  <Phone size={18} />
                  <span className="font-semibold tracking-wide uppercase text-xs">Contatti</span>
                </div>
                <a href="tel:+391234567890" className="text-sm text-brand-charcoal/80 font-medium hover:text-brand-charcoal transition-colors mb-1">+39 123 456 7890</a>
                <a href="mailto:info@beautydreamer.it" className="text-sm text-brand-charcoal/80 font-medium hover:text-brand-charcoal transition-colors">info@beautydreamer.it</a>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-brand-charcoal mb-2">
                  <Clock size={18} />
                  <span className="font-semibold tracking-wide uppercase text-xs">Orari di Apertura</span>
                </div>
                <p className="text-sm text-brand-charcoal/80 font-medium mb-1">Lun - Ven: 09:00 - 19:00</p>
                <p className="text-sm text-brand-charcoal/80 font-medium">Sab: 09:00 - 14:00 (Dom: Chiuso)</p>
              </div>

            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
