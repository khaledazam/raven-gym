"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  MessageCircle, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Crown, 
  ArrowLeft,
  Sparkles,
  Dumbbell,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const gymAddress = "أول المشاية / بجوار تشكن فاكتور / عمارة التوحيد والنور - السنبلاوين";

  const phoneNumbers = [
    {
      display: "+20 10 36605024",
      raw: "+201036605024",
      waNumber: "201036605024",
      label: "الخط المباشر 1 (واتساب ومكالمات)",
    },
    {
      display: "+20 10 27272505",
      raw: "+201027272505",
      waNumber: "201027272505",
      label: "الخط المباشر 2 (واتساب ومكالمات)",
    },
  ];

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(gymAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="contact" className="relative w-full bg-black py-28 px-4 md:px-8 border-t border-zinc-900 overflow-hidden font-sans" dir="rtl">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold tracking-wider mb-4"
          >
            <Phone className="w-3.5 h-3.5" /> تواصل مباشر وموقع الجيم
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white mb-4 leading-tight"
          >
            ابدأ تواصلك مع <span className="text-gold">Raven Gym</span>
            <span className="block text-2xl md:text-3xl text-gray-300 font-bold mt-2 font-sans">
              جيم ريفن - أول المشاية
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            جاهزون للرد على كافة استفساراتك بخصوص الاشتراكات، برامج التدريب، أو زيارة جيم Raven Gym مباشرة في أي وقت.
          </motion.p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Head Coach & Founder Profile Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 via-transparent to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-[#d4af37]/30 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#8a6b1c] flex items-center justify-center text-black shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    <Crown className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Head Coach
                  </span>
                </div>

                {/* Name & Title */}
                <h3 className="text-3xl font-heading font-black text-white tracking-wide mb-2">
                  كابتن محمد عبدالعاطي
                </h3>
                <p className="text-[#d4af37] text-sm font-bold tracking-wider mb-6 flex items-center gap-2">
                  <span>Head Coach & Founder</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-gray-300 font-normal">مؤسس Raven Gym (ريفن جيم)</span>
                </p>

                {/* Quote / Message */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/5 mb-8">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                    «هدفنا في Raven مش مجرد مكان تتمرن فيه، هدفنا بناء منظومة تدريب وتغذية متكاملة تساعدك تكسر حواجزك وتوصل لأفضل نسخة من جسمك وصحتك.»
                  </p>
                </div>

                {/* Coach highlights */}
                <div className="space-y-3 mb-8 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    <span>إشراف وتوجيه مباشر على خطط وأهداف المشتركين</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-[#d4af37]" />
                    <span>متابعة شخصية لتحقيق النتائج بأعلى معايير الأمان الرياضي</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp with Coach */}
              <a
                href="https://wa.me/201036605024?text=مرحباً%20كابتن%20محمد%20عبدالعاطي،%20أود%20الاستفسار%20عن%20التدريب%20في%20Raven%20Gym"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-full bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_5px_20px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-black stroke-none" />
                <span>تواصل واتساب مع كابتن محمد</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Contact Numbers & Gym Info (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* Phone Numbers Cards */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#d4af37]" /> أرقام الهواتف والتواصل السريع
              </h4>
              
              {phoneNumbers.map((phone, idx) => (
                <motion.div
                  key={phone.raw}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <span className="text-xs text-gray-400 block font-medium">{phone.label}</span>
                    <span className="text-2xl font-mono font-bold text-white group-hover:text-[#d4af37] transition-colors" dir="ltr">
                      {phone.display}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Call Button */}
                    <a
                      href={`tel:${phone.raw}`}
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white hover:text-black hover:bg-[#d4af37] hover:border-[#d4af37] transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Phone className="w-4 h-4" /> اتصال
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${phone.waNumber}?text=مرحباً،%20أود%20الاستفسار%20عن%20Raven%20Gym`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" /> واتساب
                    </a>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(phone.raw)}
                      aria-label="نسخ الرقم"
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                      title="نسخ الرقم"
                    >
                      {copiedNumber === phone.raw ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* HIGH-PROFILE ADDRESS & LOCATION CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-gradient-to-br from-[#181408] via-zinc-950 to-zinc-950 border border-[#d4af37]/40 p-6 sm:p-8 shadow-[0_10px_40px_rgba(212,175,55,0.12)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#aa8410] flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] shrink-0">
                    <MapPin className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#f5d77f] tracking-wider uppercase block">المقر والعنوان الرسمي</span>
                    <h5 className="text-xl sm:text-2xl font-heading font-black text-white">موقع جيم Raven Gym (ريفن)</h5>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  مفتوح 24 ساعة (24/7)
                </span>
              </div>

              {/* Exact Address Highlight */}
              <div className="bg-black/70 rounded-2xl border border-white/10 p-5 mb-5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#f5d77f] text-base font-bold shrink-0">العنوان:</span>
                  <p className="text-white text-base sm:text-lg font-bold leading-relaxed">
                    أول المشاية / بجوار تشكن فاكتور / عمارة التوحيد والنور
                  </p>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  السنبلاوين • محافظة الدقهلية • جمهورية مصر العربية
                </p>

                {/* Landmarks Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-300 font-medium">
                    أول المشاية
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-300 font-medium">
                    بجوار تشكن فاكتور
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-300 font-medium">
                    عمارة التوحيد والنور
                  </span>
                </div>
              </div>

              {/* Interactive Google Map Embed with Exact GPS Pin */}
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 mb-5 shadow-2xl relative bg-zinc-950">
                <iframe
                  title="موقع Raven Gym على خرائط Google"
                  src="https://maps.google.com/maps?q=30.884098,31.457378&hl=ar&z=17&output=embed"
                  className="w-full h-52 sm:h-60 border-0 filter contrast-125 brightness-95 hover:brightness-100 transition-all duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Address Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyAddress}
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-[#d4af37] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">تم نسخ العنوان بنجاح</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#d4af37]" />
                      <span>نسخ العنوان بالكامل</span>
                    </>
                  )}
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=30.884098,31.457378"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] text-black text-xs font-bold flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.25)] cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>الاتجاهات على خرائط Google</span>
                </a>
              </div>
            </motion.div>

            {/* Quick Link to Subscriptions */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#161307] to-zinc-950 border border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-white font-bold text-sm mb-1">هل ترغب بالاشتراك الفوري أونلاين؟</h5>
                <p className="text-gray-400 text-xs">يمكنك حجز باقتك مباشرة والدفع عبر إنستاباي بسهولة.</p>
              </div>
              <Link 
                href="/subscribe" 
                className="px-6 py-3 rounded-xl bg-gold text-black font-bold text-xs tracking-wider uppercase hover:bg-white transition-all whitespace-nowrap shadow-md cursor-pointer shrink-0"
              >
                اختر باقتك الآن
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
