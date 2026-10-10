"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle, Crown, ShieldCheck, Dumbbell, Sparkles } from "lucide-react";

export default function Footer() {
  const gymAddress = "أول المشاية / بجوار تشكن فاكتور / عمارة التوحيد والنور - السنبلاوين";

  return (
    <footer className="relative w-full bg-[#050505] border-t border-zinc-900 text-gray-400 font-sans overflow-hidden" dir="rtl">
      {/* Subtle Top Gold Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#aa8410] flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-heading text-2xl font-black text-white tracking-wider block">
                  RAVEN <span className="text-gold">GYM</span>
                </span>
                <span className="text-xs text-[#f5d77f] font-bold">صالة ريفن الرياضية - السنبلاوين</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              علامة اللياقة البدنية والتدريب المتكامل في السنبلاوين. نجمع بين أحدث الأجهزة العالمية، خطط التغذية الذكية، والمتابعة الاحترافية تحت إشراف <strong className="text-white">كابتن محمد عبدالعاطي</strong>.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-[#f5d77f]">
                <Clock className="w-3.5 h-3.5 text-gold" /> مفتوح 24/7 طوال الأسبوع
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-green-400">
                <ShieldCheck className="w-3.5 h-3.5" /> تدريب معتمد
              </span>
            </div>
          </div>

          {/* Official Location & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-heading font-bold text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" /> العنوان والموقع
            </h4>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-900 space-y-2">
              <p className="text-white text-sm font-bold leading-relaxed">
                {gymAddress}
              </p>
              <p className="text-xs text-gray-500">
                السنبلاوين • محافظة الدقهلية • مصر
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#f5d77f]">
                <span className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">أول المشاية</span>
                <span className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">بجوار تشكن فاكتور</span>
                <span className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">عمارة التوحيد والنور</span>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Raven Gym اول المشاية بجوار تشكن فاكتور عماره التوحيد والنور السنبلاوين")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-white transition-colors pt-2 font-bold cursor-pointer"
              >
                <span>فتح الموقع على خرائط Google</span>
                <span dir="ltr">→</span>
              </a>
            </div>
          </div>

          {/* Quick Links & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-heading font-bold text-base flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" /> أرقام التواصل السريع
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+201036605024"
                  className="text-gray-300 hover:text-gold transition-colors flex items-center gap-2 font-mono"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                  +20 10 36605024
                </a>
              </li>
              <li>
                <a
                  href="tel:+201027272505"
                  className="text-gray-300 hover:text-gold transition-colors flex items-center gap-2 font-mono"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                  +20 10 27272505
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20Raven%20Gym"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-black transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  محادثة واتساب مباشرة
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/subscribe"
                className="text-xs text-gold underline hover:text-white transition-colors block"
              >
                باقات واشتراكات Raven Gym (خصم الافتتاح 30%)
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-right">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} <strong className="text-gray-400">Raven Gym (ريفن جيم)</strong>. السنبلاوين، مصر.
          </p>
          <p className="flex items-center gap-1.5 justify-center">
            <span>تحت إشراف كابتن محمد عبدالعاطي</span>
            <span>•</span>
            <span className="text-gold">تدريب 24/7</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
