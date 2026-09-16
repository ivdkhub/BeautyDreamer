"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-charcoal text-brand-beige py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-gold">BeautyDreamer</h3>
            <p className="text-sm opacity-80 mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/beautydreameraesthetic/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://wa.me/393516768604" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                <Phone size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-brand-gold">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/" className="hover:text-brand-rose transition-colors">{t("nav.home")}</Link></li>
              <li><Link href="/about" className="hover:text-brand-rose transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/services" className="hover:text-brand-rose transition-colors">{t("nav.services")}</Link></li>
              <li><Link href="/portfolio" className="hover:text-brand-rose transition-colors">{t("nav.portfolio")}</Link></li>
              <li><Link href="/faq" className="hover:text-brand-rose transition-colors">{t("nav.faq")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-brand-gold">{t("footer.contacts")}</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-brand-rose" />
                <span>Via Luca Comerio 1,<br/>20145 Milano (City Life)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-brand-rose" />
                <a href="tel:+393516768604" className="hover:text-brand-gold transition-colors">+39 3516768604</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-brand-rose" />
                <a href="mailto:beautydreamerestetica@gmail.com" className="hover:text-brand-gold transition-colors">beautydreamerestetica@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-brand-gold">{t("footer.legalInfo")}</h4>
            <p className="text-sm opacity-80 mb-2">Lulli Chiara</p>
            <p className="text-sm opacity-80 mb-4">P.IVA: 12475430968</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/privacy" className="hover:text-brand-rose transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-rose transition-colors">Cookie Policy</Link></li>
              <li><Link href="/admin" className="hover:text-brand-rose transition-colors">Area Admin</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-sm opacity-70">
          <p>Copyright &copy; {new Date().getFullYear()} BeautyDreamer. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
