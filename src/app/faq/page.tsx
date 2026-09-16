"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5")
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6")
    }
  ];

  return (
    <div 
      className="pt-20 min-h-screen pb-24" 
      style={{ backgroundColor: 'rgb(243, 226, 119)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-charcoal text-brand-nude mb-4 shadow-md">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">
            {t("faq.title")}
          </h1>
          <p className="text-brand-charcoal/80 text-lg max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ParallaxCard key={idx} delay={idx * 0.05} maxTiltDeg={4} maxTranslatePx={4}>
                <div 
                  className={`border-2 border-brand-charcoal/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                    isOpen ? "bg-brand-nude/90 shadow-md" : "bg-brand-nude/50 hover:bg-brand-nude/70"
                  }`}
                >
                  <button
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <span className="font-serif font-bold text-brand-charcoal text-lg md:text-xl pr-4">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? "bg-brand-charcoal text-brand-nude" : "bg-brand-charcoal/10 text-brand-charcoal"}`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-brand-charcoal/85 leading-relaxed text-base border-t border-brand-charcoal/15 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </ParallaxCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
