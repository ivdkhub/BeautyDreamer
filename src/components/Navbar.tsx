"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Settings, Check, Globe } from "lucide-react";
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
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
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

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-brand-charcoal/10" style={{ backgroundColor: 'rgb(243, 226, 119)' }}>
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
                  className={`relative text-brand-charcoal hover:text-brand-charcoal transition-all duration-300 transform hover:scale-110 cursor-pointer text-xl font-serif tracking-wide group py-2 ${isActive ? 'font-bold scale-105' : ''}`}
                >
                  {link.name}
                  {/* Hover Bar / Active Bar */}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] bg-brand-charcoal transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: Animated Gear Button + Book Now Button */}
          <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-3">
            
            {/* Animated Settings/Gear Button for Language Selection (Rectangular) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangModalOpen(!langModalOpen)}
                className="h-9 px-2.5 sm:h-11 sm:px-3.5 rounded-xl bg-brand-charcoal text-brand-nude flex items-center justify-center shadow-sm sm:shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 group border border-brand-charcoal/20"
                title={t("nav.selectLang")}
                aria-label={t("nav.selectLang")}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-700 ease-in-out group-hover:rotate-180 animate-[spin_12s_linear_infinite]" />
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
              className="btn-primary py-2 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm rounded-xl"
            >
              {t("nav.bookNow")}
            </Link>

          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-charcoal/10 shadow-2xl absolute w-full" style={{ backgroundColor: 'rgb(243, 226, 119)' }}>
          <div className="px-4 pt-4 pb-6 space-y-2 text-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 font-serif text-xl tracking-wide transition-colors ${isActive ? 'text-brand-charcoal font-bold bg-brand-charcoal/10 rounded-lg' : 'text-brand-charcoal hover:opacity-80'}`}
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
                className="inline-block w-full btn-primary"
              >
                {t("nav.bookNow")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
