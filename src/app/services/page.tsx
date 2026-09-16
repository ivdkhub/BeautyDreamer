"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Gift, Tag, Copy, Check, Percent } from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

interface PromoInfo {
  type: "combo" | "voucher" | "pack" | "giftcard";
  badge: string;
  title: string;
  desc: string;
  voucherCode?: string;
}

interface ServiceItem {
  name: string;
  desc: string;
  price: string;
  promo?: PromoInfo;
}

interface ServiceSection {
  category: string;
  items: ServiceItem[];
}

export default function ServicesPage() {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const services: ServiceSection[] = [
    {
      category: t("services.cat1"),
      items: [
        { 
          name: t("services.s1_1_title"), 
          desc: t("services.s1_1_desc"), 
          price: t("services.s1_1_price"),
          promo: {
            type: "combo",
            badge: t("services.p_dry_badge"),
            title: t("services.p_dry_title"),
            desc: t("services.p_dry_desc"),
            voucherCode: t("services.p_dry_code")
          }
        },
        { 
          name: t("services.s1_2_title"), 
          desc: t("services.s1_2_desc"), 
          price: t("services.s1_2_price") 
        },
      ]
    },
    {
      category: t("services.cat2"),
      items: [
        { 
          name: t("services.s2_1_title"), 
          desc: t("services.s2_1_desc"), 
          price: t("services.s2_1_price"),
          promo: {
            type: "pack",
            badge: t("services.p_semi_badge"),
            title: t("services.p_semi_title"),
            desc: t("services.p_semi_desc"),
            voucherCode: t("services.p_semi_code")
          }
        }
      ]
    },
    {
      category: t("services.cat3"),
      items: [
        { 
          name: t("services.s3_1_title"), 
          desc: t("services.s3_1_desc"), 
          price: t("services.s3_1_price"),
          promo: {
            type: "voucher",
            badge: t("services.p_ricostruzione_badge"),
            title: t("services.p_ricostruzione_title"),
            desc: t("services.p_ricostruzione_desc"),
            voucherCode: t("services.p_ricostruzione_code")
          }
        },
        { 
          name: t("services.s3_2_title"), 
          desc: t("services.s3_2_desc"), 
          price: t("services.s3_2_price") 
        },
        { 
          name: t("services.s3_3_title"), 
          desc: t("services.s3_3_desc"), 
          price: t("services.s3_3_price") 
        }
      ]
    },
    {
      category: t("services.cat4"),
      items: [
        { 
          name: t("services.s4_1_title"), 
          desc: t("services.s4_1_desc"), 
          price: t("services.s4_1_price") 
        }
      ]
    },
    {
      category: t("services.cat5"),
      items: [
        { 
          name: t("services.s5_1_title"), 
          desc: t("services.s5_1_desc"), 
          price: t("services.s5_1_price") 
        },
        { 
          name: t("services.s5_2_title"), 
          desc: t("services.s5_2_desc"), 
          price: t("services.s5_2_price") 
        },
        { 
          name: t("services.s5_3_title"), 
          desc: t("services.s5_3_desc"), 
          price: t("services.s5_3_price"),
          promo: {
            type: "giftcard",
            badge: t("services.p_spa_badge"),
            title: t("services.p_spa_title"),
            desc: t("services.p_spa_desc"),
            voucherCode: t("services.p_spa_code")
          }
        },
        { 
          name: t("services.s5_4_title"), 
          desc: t("services.s5_4_desc"), 
          price: t("services.s5_4_price"),
          promo: {
            type: "combo",
            badge: t("services.p_callus_badge"),
            title: t("services.p_callus_title"),
            desc: t("services.p_callus_desc"),
            voucherCode: t("services.p_callus_code")
          }
        }
      ]
    },
    {
      category: t("services.cat6"),
      items: [
        { 
          name: t("services.s6_1_title"), 
          desc: t("services.s6_1_desc"), 
          price: t("services.s6_1_price") 
        }
      ]
    }
  ];

  return (
    <div className="pt-20 bg-brand-nude min-h-screen">
      <div className="bg-brand-charcoal py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-beige mb-4">
          {t("services.headerTitle")}
        </h1>
        <p className="text-brand-nude/90 max-w-2xl mx-auto text-lg">
          {t("services.headerSubtitle")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Promos & Gift Cards Highlights Banner */}
        <div className="mb-16 bg-gradient-to-r from-brand-charcoal to-[#3d0915] text-brand-nude rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-brand-charcoal/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#f4e47c] text-[#5e1122] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Promo & Benefits
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-brand-beige mb-3">
            {t("services.promoBannerTitle")}
          </h2>
          <p className="text-brand-nude/80 text-sm md:text-base max-w-3xl leading-relaxed mb-8">
            {t("services.promoBannerSubtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#f4e47c]/15 text-[#f4e47c] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-sm">Combo & Sconti</h4>
                <p className="text-xs text-brand-nude/70 mt-1">Combina Mani + Piedi o Spa per sconti fino al 15% sul totale.</p>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#f4e47c]/15 text-[#f4e47c] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-sm">Voucher Code</h4>
                <p className="text-xs text-brand-nude/70 mt-1">Copia i codici attivi e incollali nel form di prenotazione per sbloccare l&apos;offerta.</p>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#f4e47c]/15 text-[#f4e47c] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-sm">Gift Card Regalo</h4>
                <p className="text-xs text-brand-nude/70 mt-1">Tutti i trattamenti sono disponibili come Gift Card regalo elegante e personalizzata.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {services.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-3xl font-serif text-brand-charcoal mb-8 pb-2 border-b-2 border-brand-charcoal/20">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((item, itemIdx) => {
                  const hasPromo = !!item.promo;
                  return (
                    <ParallaxCard 
                      key={itemIdx} 
                      delay={itemIdx * 0.08} 
                      maxTiltDeg={6} 
                      maxTranslatePx={6}
                      className="h-full"
                    >
                      <div className={`bg-brand-nude p-8 rounded-2xl border-2 ${hasPromo ? "border-brand-charcoal/40 shadow-lg ring-1 ring-brand-charcoal/10" : "border-brand-charcoal/20 shadow-md"} hover:shadow-xl transition-all h-full flex flex-col justify-between relative overflow-hidden`}>
                        {hasPromo && item.promo && (
                          <div className="mb-3 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 bg-brand-charcoal text-[#f4e47c] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                              {item.promo.type === "giftcard" ? (
                                <Gift className="w-3.5 h-3.5" />
                              ) : item.promo.type === "voucher" ? (
                                <Tag className="w-3.5 h-3.5" />
                              ) : (
                                <Sparkles className="w-3.5 h-3.5" />
                              )}
                              {item.promo.badge}
                            </span>
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-serif font-bold text-brand-charcoal">{item.name}</h3>
                            <span className="font-serif text-brand-charcoal font-bold whitespace-nowrap ml-4 bg-brand-charcoal/10 px-3 py-1 rounded-full text-sm">{item.price}</span>
                          </div>
                          <p className="text-brand-charcoal/80 mb-4 text-sm leading-relaxed">
                            {item.desc}
                          </p>

                          {hasPromo && item.promo && (
                            <div className="my-4 p-4 rounded-xl bg-brand-charcoal/5 border border-brand-charcoal/15 space-y-2.5">
                              <div className="flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-brand-charcoal flex-shrink-0" />
                                <span className="font-serif font-bold text-sm text-brand-charcoal">
                                  {item.promo.title}
                                </span>
                              </div>
                              <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                                {item.promo.desc}
                              </p>

                              {item.promo.voucherCode && (
                                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-brand-charcoal/10">
                                  <div className="flex items-center gap-1.5 text-xs text-brand-charcoal/70">
                                    <Tag className="w-3.5 h-3.5" />
                                    <span>Codice: <strong className="font-mono font-bold text-brand-charcoal tracking-wide">{item.promo.voucherCode}</strong></span>
                                  </div>
                                  <button
                                    onClick={(e) => handleCopy(item.promo!.voucherCode!, e)}
                                    type="button"
                                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-charcoal text-brand-nude hover:bg-brand-charcoal/80 transition-colors shadow-sm"
                                  >
                                    {copiedCode === item.promo.voucherCode ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-400" />
                                        <span>{t("services.copiedCode")}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>{t("services.copyCode")}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-brand-charcoal/10 mt-2">
                          <Link 
                            href={`/book?service=${encodeURIComponent(item.name)}${item.promo?.voucherCode ? `&voucher=${encodeURIComponent(item.promo.voucherCode)}` : ""}`} 
                            className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-brand-charcoal hover:underline underline-offset-4 transition-all group"
                          >
                            {hasPromo ? t("services.bookWithPromo") : t("services.bookService")}
                            <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </ParallaxCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
