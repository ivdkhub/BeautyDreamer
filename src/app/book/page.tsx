"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  Check,
  CalendarPlus, 
  Share2, 
  Send, 
  Bell, 
  MapPin, 
  Download,
  ShieldCheck,
  Tag
} from "lucide-react";
import ParallaxCard from "@/components/ParallaxCard";
import { useLanguage } from "@/context/LanguageContext";

function BookingForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const preselectedVoucher = searchParams.get("voucher") || "";

  const [formData, setFormData] = useState({
    service: preselectedService,
    voucher: preselectedVoucher,
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    whatsappReminder: true,
    previousRemoval: false
  });

  const [submitted, setSubmitted] = useState(false);

  const knownVouchers: Record<string, { label: string; discount: string }> = {
    COMBOMANIPIEDI: { label: "Combo Mani + Pedicure", discount: "-15% Sconto + Idratazione Omaggio" },
    SEMIPACK: { label: "Bono Semipermanente 3 Sedute", discount: "Nail Art Omaggio ad ogni seduta" },
    NEWBEAUTY: { label: "Welcome Promo Nuova Ricostruzione", discount: "-10% di Sconto" },
    GIFTDREAM: { label: "Gift Card / Voucher Relax Spa", discount: "Gift Card Dedicata" },
    PEDISPA55: { label: "Combo Levigante + Spa", discount: "Prezzo Speciale 55€ (anziché 65€)" },
    BEAUTY10: { label: "Promo Primo Trattamento", discount: "-10% di Sconto" },
  };

  const currentVoucherUpper = (formData.voucher || "").trim().toUpperCase();
  const matchedVoucher = knownVouchers[currentVoucherUpper];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const coreFields = ["service", "date", "time", "firstName", "lastName", "email", "phone"];
  const filledCount = coreFields.filter(field => formData[field as keyof typeof formData]?.toString().trim() !== "").length;
  const progressRatio = filledCount / coreFields.length;
  const progressPercent = Math.round(progressRatio * 100);

  // Helper: Genera link per Google Calendar
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`BeautyDreamer: ${formData.service || "Manicure"}`);
    const details = encodeURIComponent(
      `Trattamento: ${formData.service}\n` +
      (formData.voucher ? `Voucher/Promo: ${formData.voucher} (${matchedVoucher ? matchedVoucher.discount : "Promo Applicata"})\n` : "") +
      `Cliente: ${formData.firstName} ${formData.lastName}\nTelefono: ${formData.phone}\nNote: ${formData.notes || "Nessuna nota"}\n\nOperiamo a Milano City-Life.\nContatto WhatsApp: +39 351 6768604`
    );
    const location = encodeURIComponent("Milano City-Life");
    const dateStr = (formData.date || new Date().toISOString().split("T")[0]).replace(/-/g, "");
    const isMorning = formData.time.includes("Mattina") || formData.time.includes("Morning") || formData.time.includes("Mañana");
    const startTime = isMorning ? "093000" : "150000";
    const endTime = isMorning ? "110000" : "163000";
    const dates = `${dateStr}T${startTime}/${dateStr}T${endTime}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Helper: Scarica file .ics (Apple Calendar, Outlook, Mobile)
  const downloadIcsFile = () => {
    const isMorning = formData.time.includes("Mattina") || formData.time.includes("Morning") || formData.time.includes("Mañana");
    const startTime = isMorning ? "093000" : "150000";
    const endTime = isMorning ? "110000" : "163000";
    const dateStr = (formData.date || new Date().toISOString().split("T")[0]).replace(/-/g, "");
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BeautyDreamer//Booking//IT",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:BeautyDreamer - ${formData.service || "Manicure"}`,
      `DESCRIPTION:Trattamento: ${formData.service}\\n${formData.voucher ? `Voucher: ${formData.voucher}\\n` : ""}Cliente: ${formData.firstName} ${formData.lastName}\\nOperiamo a Milano City-Life.`,
      `LOCATION:Milano City-Life`,
      `DTSTART:${dateStr}T${startTime}`,
      `DTEND:${dateStr}T${endTime}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `appuntamento-beautydreamer-${formData.date || "promemoria"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper: Invia messaggio promemoria su WhatsApp a se stessi o condivisione
  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `✨ *Promemoria Appuntamento BeautyDreamer*\n\n` +
      `💅 *Trattamento:* ${formData.service || "Manicure"}\n` +
      (formData.voucher ? `🎟️ *Codice Promo/Voucher:* ${formData.voucher}${matchedVoucher ? ` (${matchedVoucher.discount})` : ""}\n` : "") +
      `📅 *Data:* ${formData.date}\n` +
      `⏰ *Fascia Oraria:* ${formData.time}\n` +
      `📍 *Indirizzo:* Milano City-Life\n` +
      `👤 *Nominativo:* ${formData.firstName} ${formData.lastName}\n\n` +
      `_I dettagli sono stati salvati con successo._`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  // Helper: Conferma immediata diretta su WhatsApp con Chiara
  const getWhatsAppDirectContactUrl = () => {
    const text = encodeURIComponent(
      `Ciao Chiara! Ho appena inviato una richiesta di prenotazione per *${formData.service}* in data *${formData.date}* (${formData.time}) a nome di *${formData.firstName} ${formData.lastName}*.\n\n` +
      (formData.voucher ? `🎟️ Codice Voucher/Promo: *${formData.voucher}*${matchedVoucher ? ` (${matchedVoucher.discount})` : ""}\n\n` : "") +
      (formData.notes ? `Note: ${formData.notes}\n\n` : "") +
      `Attendo tua conferma. Grazie!`
    );
    return `https://wa.me/393516768604?text=${text}`;
  };

  if (submitted) {
    return (
      <div className="bg-brand-nude p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-brand-charcoal/20 max-w-xl mx-auto transform transition-all relative overflow-hidden text-center">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-charcoal/10 rounded-bl-full pointer-events-none"></div>

        <div className="w-20 h-20 bg-brand-charcoal text-brand-nude rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle className="w-10 h-10" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-2">
          {t("book.successTitle")}
        </h2>
        <p className="text-brand-charcoal/80 mb-6 text-sm">
          {t("book.successDesc")}
        </p>

        {/* Riepilogo Dettagliato Appuntamento */}
        <div className="bg-brand-nude/80 border-2 border-brand-charcoal/20 rounded-2xl p-6 text-left mb-8 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-brand-charcoal/15 pb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/60">{t("book.summaryTreatment")}</span>
            <span className="font-serif font-bold text-brand-charcoal text-lg">{formData.service || "Dry Manicure"}</span>
          </div>

          {formData.voucher && (
            <div className="flex items-center justify-between border-b border-brand-charcoal/15 pb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/60">{t("book.summaryVoucher")}</span>
              <span className="font-semibold text-brand-charcoal flex items-center gap-1.5 bg-brand-charcoal/10 px-2.5 py-1 rounded-full text-xs">
                <Tag className="w-3.5 h-3.5 text-brand-charcoal" />
                <strong className="font-mono">{formData.voucher}</strong> {matchedVoucher ? `(${matchedVoucher.discount})` : ""}
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 border-b border-brand-charcoal/15 pb-3">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/60 block">{t("book.summaryDate")}</span>
              <span className="font-semibold text-brand-charcoal">{formData.date || "--"}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/60 block">{t("book.summaryTime")}</span>
              <span className="font-semibold text-brand-charcoal">{formData.time || "--"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-brand-charcoal/15 pb-3">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/60 block">{t("book.summaryClient")}</span>
              <span className="font-semibold text-brand-charcoal">{formData.firstName} {formData.lastName}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/60 block">{t("book.summaryPhone")}</span>
              <span className="font-semibold text-brand-charcoal">{formData.phone || "--"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-sm text-brand-charcoal/80">
            <MapPin className="w-4 h-4 text-brand-charcoal flex-shrink-0" />
            <span>{t("book.summaryLocation")} <strong>Milano City-Life</strong></span>
          </div>
        </div>

        {/* AZIONI: WhatsApp & Calendario */}
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Promemoria WhatsApp Personale */}
            <a 
              href={getWhatsAppShareUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" /> {t("book.shareWhatsApp")}
            </a>

            {/* Invia Notifica a Chiara */}
            <a 
              href={getWhatsAppDirectContactUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-brand-charcoal text-brand-nude py-3 px-4 rounded-xl font-semibold text-sm hover:opacity-95 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Google Calendar */}
            <a 
              href={getGoogleCalendarUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-brand-nude border-2 border-brand-charcoal/30 text-brand-charcoal py-3 px-4 rounded-xl font-semibold text-sm hover:bg-brand-charcoal hover:text-brand-nude transition-all"
            >
              <CalendarPlus className="w-4 h-4" /> Google Calendar
            </a>

            {/* Apple / Outlook Calendar (.ics) */}
            <button 
              onClick={downloadIcsFile}
              className="flex items-center justify-center gap-2 bg-brand-nude border-2 border-brand-charcoal/30 text-brand-charcoal py-3 px-4 rounded-xl font-semibold text-sm hover:bg-brand-charcoal hover:text-brand-nude transition-all"
            >
              <Download className="w-4 h-4" /> Apple / Outlook (.ics)
            </button>
          </div>
        </div>

        <button 
          onClick={() => setSubmitted(false)} 
          className="text-xs uppercase font-bold tracking-widest text-brand-charcoal/70 hover:text-brand-charcoal underline underline-offset-4"
        >
          {t("book.backHome")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-nude p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-brand-charcoal/20 relative overflow-hidden transition-colors duration-700">
      
      {/* Top Completion Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-1.5 bg-brand-charcoal transition-all duration-700 ease-out z-20"
        style={{ width: `${progressPercent}%` }}
      />

      {/* Fluid Dynamic Darker Color Fill expanding from the top-right corner */}
      <div 
        className="absolute inset-0 bg-brand-charcoal/15 pointer-events-none transition-all duration-800 ease-out z-0"
        style={{
          clipPath: `circle(${12 + (progressRatio * 138)}% at 100% 0%)`,
          transition: 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />
      
      {/* Secondary Soft Glow/Wave Accent */}
      <div 
        className="absolute inset-0 bg-gradient-to-bl from-brand-charcoal/10 via-transparent to-transparent pointer-events-none transition-opacity duration-700 z-0"
        style={{ opacity: 0.3 + (progressRatio * 0.7) }}
      />
      
      <div className="relative z-10 space-y-8">
        
        {/* Step 1: Service & Date */}
        <div>
          <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-6 flex items-center gap-2">
            <Sparkles className="text-brand-charcoal w-5 h-5" /> 
            {t("book.step1")}
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <label htmlFor="service" className="sr-only">{t("book.step1")}</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-brand-charcoal/60" />
              </div>
              <select 
                id="service" name="service" required 
                value={formData.service} onChange={handleChange}
                className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all appearance-none"
              >
                <option value="" disabled>{t("book.selectServicePlaceholder")}</option>
                <optgroup label={t("services.cat1")}>
                  <option value="Dry Manicure">{t("services.s1_1_title")}</option>
                  <option value="Pedicure Senza Lame">{t("services.s1_2_title")}</option>
                </optgroup>
                <optgroup label={t("services.cat2")}>
                  <option value="Semipermanente Mani/Piedi">{t("services.s2_1_title")}</option>
                </optgroup>
                <optgroup label={t("services.cat3")}>
                  <option value="Ricostruzione Gel/Acrygel">{t("services.s3_1_title")}</option>
                  <option value="Ritocco Mensile">{t("services.s3_2_title")}</option>
                  <option value="Copertura su Naturale">{t("services.s3_3_title")}</option>
                </optgroup>
                <optgroup label={t("services.cat4") + " / " + t("services.cat6")}>
                  <option value="Nail Art">{t("services.s4_1_title")}</option>
                  <option value="Epilazione">{t("services.s6_1_title")}</option>
                </optgroup>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="date" className="sr-only">{t("book.dateLabel")}</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-brand-charcoal/60" />
                </div>
                <input 
                  type="date" id="date" name="date" required 
                  value={formData.date} onChange={handleChange}
                  className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all"
                />
              </div>
              <div className="relative">
                <label htmlFor="time" className="sr-only">{t("book.timeLabel")}</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-brand-charcoal/60" />
                </div>
                <select 
                  id="time" name="time" required 
                  value={formData.time} onChange={handleChange}
                  className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all appearance-none"
                >
                  <option value="" disabled>{t("book.selectTimePlaceholder")}</option>
                  <option value="Mattina (09:30 - 13:00)">{t("book.timeMorning")}</option>
                  <option value="Pomeriggio (14:30 - 19:30)">{t("book.timeAfternoon")}</option>
                </select>
              </div>
            </div>

            {/* Codice Promo / Voucher / Gift Card */}
            <div className="pt-2">
              <label htmlFor="voucher" className="block text-xs uppercase font-bold tracking-wider text-brand-charcoal/70 mb-2">
                {t("book.voucherLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-brand-charcoal/60" />
                </div>
                <input 
                  type="text" 
                  id="voucher" 
                  name="voucher" 
                  placeholder={t("book.voucherPlaceholder")}
                  value={formData.voucher} 
                  onChange={handleChange}
                  className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-3.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all font-mono placeholder:font-sans placeholder:text-brand-charcoal/50 uppercase"
                />
              </div>

              {matchedVoucher && (
                <div className="mt-2.5 p-3 rounded-xl bg-brand-charcoal/10 border border-brand-charcoal/20 flex items-center gap-2.5 text-xs text-brand-charcoal animate-fadeIn">
                  <Sparkles className="w-4 h-4 text-[#5e1122] flex-shrink-0" />
                  <span>
                    <strong className="font-semibold">{matchedVoucher.label}:</strong> {matchedVoucher.discount}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Personal Details */}
        <div>
          <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-6 flex items-center gap-2">
            <User className="text-brand-charcoal w-5 h-5" />
            {t("book.step3")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <input 
                type="text" id="firstName" name="firstName" required placeholder={t("book.firstName")}
                value={formData.firstName} onChange={handleChange}
                className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl px-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all placeholder:text-brand-charcoal/50"
              />
            </div>
            <div className="relative">
              <input 
                type="text" id="lastName" name="lastName" required placeholder={t("book.lastName")}
                value={formData.lastName} onChange={handleChange}
                className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl px-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all placeholder:text-brand-charcoal/50"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-brand-charcoal/60" />
              </div>
              <input 
                type="email" id="email" name="email" required placeholder={t("book.email")}
                value={formData.email} onChange={handleChange}
                className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all placeholder:text-brand-charcoal/50"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-brand-charcoal/60" />
              </div>
              <input 
                type="tel" id="phone" name="phone" required placeholder={t("book.phone")}
                value={formData.phone} onChange={handleChange}
                className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all placeholder:text-brand-charcoal/50"
              />
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute top-4 left-4 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-brand-charcoal/60" />
            </div>
            <textarea 
              id="notes" name="notes" rows={3} placeholder={t("book.notesPlaceholder")}
              value={formData.notes} onChange={handleChange}
              className="w-full bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/30 rounded-xl pl-12 pr-4 py-4 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal/50 transition-all resize-none placeholder:text-brand-charcoal/50"
            ></textarea>
          </div>

          {/* Opzioni Aggiuntive & Promemoria */}
          <div className="bg-brand-nude/40 backdrop-blur-sm border-2 border-brand-charcoal/20 rounded-2xl p-5 space-y-4">
            <label className="flex items-center gap-3.5 cursor-pointer text-sm text-brand-charcoal select-none group">
              <div className="relative flex items-center justify-center flex-shrink-0">
                <input 
                  type="checkbox" 
                  name="whatsappReminder"
                  checked={formData.whatsappReminder}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-6 h-6 rounded-full border-2 border-brand-charcoal/40 peer-checked:border-brand-charcoal peer-checked:bg-brand-charcoal bg-brand-nude/60 transition-all duration-300 flex items-center justify-center shadow-sm group-hover:border-brand-charcoal">
                  <Check className="w-3.5 h-3.5 text-brand-nude stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="flex items-center gap-1.5 font-medium text-brand-charcoal/90">
                <Bell className="w-4 h-4 text-brand-charcoal/70" />
                {t("book.optWhatsapp")}
              </span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer text-sm text-brand-charcoal select-none group">
              <div className="relative flex items-center justify-center flex-shrink-0">
                <input 
                  type="checkbox" 
                  name="previousRemoval"
                  checked={formData.previousRemoval}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-6 h-6 rounded-full border-2 border-brand-charcoal/40 peer-checked:border-brand-charcoal peer-checked:bg-brand-charcoal bg-brand-nude/60 transition-all duration-300 flex items-center justify-center shadow-sm group-hover:border-brand-charcoal">
                  <Check className="w-3.5 h-3.5 text-brand-nude stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="font-medium text-brand-charcoal/90">
                {t("book.optRemoval")}
              </span>
            </label>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button type="submit" className="w-full btn-primary px-12 py-4 text-lg shadow-lg shadow-brand-rose/50 hover:shadow-brand-gold/40 hover:-translate-y-1">
            {t("book.submitBtn")}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function BookPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 bg-brand-nude/30 min-h-screen pb-24">
      {/* Elegante Header della Pagina */}
      <div className="bg-brand-charcoal py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-beige mb-4">
            {t("book.title")}
          </h1>
          <p className="text-brand-nude/80 text-lg font-light">
            {t("book.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column: Image & Info */}
          <div className="w-full lg:w-5/12 space-y-8">
            <ParallaxCard maxTiltDeg={7} maxTranslatePx={7} className="w-full">
              <div className="relative h-80 lg:h-96 w-full rounded-3xl overflow-hidden shadow-2xl hidden md:block border-2 border-brand-charcoal/20 bg-black/40">
                <video 
                  src="/assets/videos/t134.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-8 pointer-events-none">
                  <p className="text-white font-serif text-2xl drop-shadow-md">BeautyDreamer • Milano City-Life</p>
                </div>
              </div>
            </ParallaxCard>
            
            <div className="bg-brand-nude p-8 rounded-3xl shadow-sm border-2 border-brand-charcoal/20 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-brand-nude flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-charcoal text-lg">{t("book.badge1Title")}</h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed">{t("book.badge1Desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-brand-nude flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-charcoal text-lg">{t("book.badge2Title")}</h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed">{t("book.badge2Desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-brand-nude flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-charcoal text-lg">{t("book.badge3Title")}</h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed">{t("book.badge3Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-7/12 -mt-10 lg:-mt-24 relative z-20">
            <Suspense fallback={<div className="text-center p-10">Caricamento modulo...</div>}>
              <BookingForm />
            </Suspense>
          </div>
          
        </div>
      </div>
    </div>
  );
}
