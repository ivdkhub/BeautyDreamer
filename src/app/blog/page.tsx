"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Clock, Calendar, Sparkles, BookOpen, ArrowRight, User } from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  date: string;
  content: {
    intro: string;
    sections: { heading: string; text: string }[];
    conclusion: string;
    proTip: string;
  };
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: t("blog.a1_title"),
      excerpt: t("blog.a1_excerpt"),
      category: t("blog.a1_category"),
      readTime: "3 min",
      image: "/assets/images/blog/blog-semipermanente-cura.jpg",
      date: t("blog.a1_date"),
      content: {
        intro: t("blog.a1_intro"),
        sections: [
          {
            heading: t("blog.a1_h1"),
            text: t("blog.a1_t1")
          },
          {
            heading: t("blog.a1_h2"),
            text: t("blog.a1_t2")
          },
          {
            heading: t("blog.a1_h3"),
            text: t("blog.a1_t3")
          }
        ],
        conclusion: t("blog.a1_conclusion"),
        proTip: t("blog.a1_proTip")
      }
    },
    {
      id: 2,
      title: t("blog.a2_title"),
      excerpt: t("blog.a2_excerpt"),
      category: t("blog.a2_category"),
      readTime: "4 min",
      image: "/assets/images/blog/blog-autumn-trends.jpg",
      date: t("blog.a2_date"),
      content: {
        intro: t("blog.a2_intro"),
        sections: [
          {
            heading: t("blog.a2_h1"),
            text: t("blog.a2_t1")
          },
          {
            heading: t("blog.a2_h2"),
            text: t("blog.a2_t2")
          },
          {
            heading: t("blog.a2_h3"),
            text: t("blog.a2_t3")
          }
        ],
        conclusion: t("blog.a2_conclusion"),
        proTip: t("blog.a2_proTip")
      }
    },
    {
      id: 3,
      title: t("blog.a3_title"),
      excerpt: t("blog.a3_excerpt"),
      category: t("blog.a3_category"),
      readTime: "2 min",
      image: "/assets/images/blog/blog-cuticle-babyboomer.jpg",
      date: t("blog.a3_date"),
      content: {
        intro: t("blog.a3_intro"),
        sections: [
          {
            heading: t("blog.a3_h1"),
            text: t("blog.a3_t1")
          },
          {
            heading: t("blog.a3_h2"),
            text: t("blog.a3_t2")
          },
          {
            heading: t("blog.a3_h3"),
            text: t("blog.a3_t3")
          }
        ],
        conclusion: t("blog.a3_conclusion"),
        proTip: t("blog.a3_proTip")
      }
    }
  ];

  const activeArticle = articles.find(a => a.id === activeArticleId) || null;

  return (
    <div 
      className="pt-20 min-h-screen pb-24" 
      style={{ backgroundColor: 'rgb(243, 226, 119)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Header Sezione Blog */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-charcoal text-brand-nude mb-4 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">
            {t("blog.title")}
          </h1>
          <p className="text-brand-charcoal/80 max-w-2xl mx-auto text-lg">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Griglia Articoli */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <ParallaxCard key={article.id} delay={idx * 0.1} maxTiltDeg={6} maxTranslatePx={6} className="h-full">
              <article 
                onClick={() => setActiveArticleId(article.id)}
                className="bg-brand-nude/70 backdrop-blur-sm border-2 border-brand-charcoal/20 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-brand-charcoal/10">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-brand-charcoal/90 backdrop-blur-xs text-brand-nude px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-7 pb-4">
                    <div className="flex justify-between items-center text-xs text-brand-charcoal/70 mb-3 font-medium">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-charcoal mb-3 leading-snug group-hover:underline underline-offset-4 transition-all">
                      {article.title}
                    </h2>
                    <p className="text-brand-charcoal/80 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticleId(article.id);
                    }}
                    className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold transition-colors group"
                  >
                    <span>{t("blog.readArticle")}</span>
                    <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </article>
            </ParallaxCard>
          ))}
        </div>
      </div>

      {/* MODALE SEMITRASPARENTE DI LETTURA ARTICOLO */}
      {activeArticle && (
        <div 
          onClick={() => setActiveArticleId(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#f4e47c] border-2 border-brand-charcoal/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-brand-charcoal transition-all animate-in zoom-in-95 duration-200 flex flex-col"
          >
            {/* Header del Modale (Sticky su Mobile) */}
            <div className="sticky top-0 z-20 bg-[#f4e47c]/95 backdrop-blur-md px-6 py-4 border-b border-brand-charcoal/20 flex justify-between items-center rounded-t-3xl">
              <span className="bg-brand-charcoal text-brand-nude px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticleId(null)}
                className="w-9 h-9 rounded-full bg-brand-charcoal/10 hover:bg-brand-charcoal hover:text-brand-nude flex items-center justify-center transition-colors cursor-pointer"
                title="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenuto dell'Articolo */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Immagine Principale */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-brand-charcoal/10 shadow-inner">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Titolo e Metadati */}
              <div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-charcoal/70 mb-2">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-charcoal" /> {activeArticle.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-charcoal" /> {activeArticle.readTime} ({t("blog.readTime")})</span>
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-charcoal" /> Chiara Lulli</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-charcoal leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              {/* Introduzione */}
              <p className="text-base sm:text-lg text-brand-charcoal/90 font-medium leading-relaxed border-l-4 border-brand-charcoal pl-4 italic">
                {activeArticle.content.intro}
              </p>

              {/* Sezioni di Contenuto */}
              <div className="space-y-5 pt-2">
                {activeArticle.content.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-brand-nude/40 border border-brand-charcoal/15 rounded-2xl p-5 space-y-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-charcoal">
                      {sec.heading}
                    </h3>
                    <p className="text-brand-charcoal/85 text-sm sm:text-base leading-relaxed">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Consiglio Pro */}
              <div className="bg-brand-charcoal text-brand-nude p-5 sm:p-6 rounded-2xl shadow-md space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-brand-gold">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                  <span>{t("blog.proTipTitle")}:</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-brand-nude/90">
                  {activeArticle.content.proTip}
                </p>
              </div>

              {/* Conclusione */}
              <p className="text-sm sm:text-base text-brand-charcoal/90 leading-relaxed font-medium">
                {activeArticle.content.conclusion}
              </p>

              {/* Box Call To Action nel Modale */}
              <div className="pt-4 border-t border-brand-charcoal/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/book"
                  onClick={() => setActiveArticleId(null)}
                  className="w-full sm:w-auto btn-primary text-center shadow-md"
                >
                  {t("blog.bookAfterReading")}
                </Link>
                <button
                  onClick={() => setActiveArticleId(null)}
                  className="w-full sm:w-auto text-xs uppercase font-bold tracking-widest text-brand-charcoal/70 hover:text-brand-charcoal underline"
                >
                  {t("blog.backToBlog")}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
