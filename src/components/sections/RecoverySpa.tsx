"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Flame,
  Wind,
  Snowflake,
  HeartPulse,
  ShieldPlus,
  ArrowLeft,
  Sparkles,
  Check,
  Clock,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  tag: string;
  titleAr: string;
  titleEn: string;
  description: string;
  benefits: string[];
  duration?: string;
  icon: React.ReactNode;
  accent: {
    badge: string;
    iconBg: string;
    borderHover: string;
    glow: string;
  };
}

const RECOVERY_SERVICES: ServiceItem[] = [
  {
    id: "jacuzzi",
    tag: "HYDROTHERAPY",
    titleAr: "الجاكوزي المائي الساخن",
    titleEn: "Hot Jacuzzi & Hydrotherapy",
    description:
      "تدليك هيدروليكي متقدم بالماء الساخن لتهدئة الجهاز العصبي، تخفيف الضغط عن المفاصل والفقرات، وتسريع تدفق الدم للألياف العضلية المرهقة.",
    benefits: [
      "تخفيف تقلصات وتصلب العضلات بعد التمارين الشاقة",
      "تحسين مرونة الأوتار وتنشيط الدورة الدموية",
      "تقليل مستويات التوتر وتجهيز الجسم للنوم العميق",
    ],
    duration: "متاح طوال الأسبوع",
    icon: <Waves className="w-6 h-6 stroke-[2]" />,
    accent: {
      badge: "bg-[#d4af37]/10 text-[#f5d77f] border-[#d4af37]/30",
      iconBg: "from-[#d4af37] to-[#997715] text-black",
      borderHover: "hover:border-[#d4af37]/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]",
    },
  },
  {
    id: "sauna",
    tag: "THERMAL DETOX",
    titleAr: "السونا الجافة",
    titleEn: "Traditional Dry Sauna",
    description:
      "حرارة جافة محسوبة بدقة ترفع معدل التعرق وتساعد الجسم على طرد السموم، خفض هرمون الكورتيزول، وتعزيز كفاءة عضلة القلب والأوعية الدموية.",
    benefits: [
      "تنقية المسام والتخلص من حمض اللاكتيك المتراكم",
      "تحفيز إفراز هرمون النمو والمساعدة في الاستشفاء",
      "تعزيز حرق السعرات الحرارية وتصفية الذهن",
    ],
    duration: "جلسات استشفاء مبرمجة",
    icon: <Flame className="w-6 h-6 stroke-[2]" />,
    accent: {
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      iconBg: "from-amber-500 to-amber-700 text-white",
      borderHover: "hover:border-amber-500/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]",
    },
  },
  {
    id: "steam",
    tag: "STEAM THERAPY",
    titleAr: "غرفة البخار الرطب",
    titleEn: "Aromatherapy Steam Room",
    description:
      "بيئة بخار دافئة عالية الرطوبة تساعد على فتح الشعب الهوائية، ترطيب البشرة، وتخفيف آلام المفاصل عبر جلسات استرخاء عميقة بعد التدريب.",
    benefits: [
      "تحسين كفاءة التنفس وتوسيع الممرات التنفسية",
      "ترطيب عميق للجلد وتحفيز تجديد الخلايا",
      "إرخاء الأنسجة الضامة والمفاصل المشدودة",
    ],
    duration: "متاح طوال الأسبوع",
    icon: <Wind className="w-6 h-6 stroke-[2]" />,
    accent: {
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      iconBg: "from-cyan-600 to-cyan-800 text-white",
      borderHover: "hover:border-cyan-500/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]",
    },
  },
  {
    id: "ice-bath",
    tag: "COLD PLUNGE",
    titleAr: "حمام الثلج الرياضي",
    titleEn: "Athletic Ice Bath & Cold Plunge",
    description:
      "العلاج بالتبريد الاحترافي المستخدم من نخبة رياضيي العالم لتقليص الالتهابات الحادة، تنشيط الجهاز العصبي السمبثاوي، وتقليل ألم العضلات المتأخر.",
    benefits: [
      "تقليل تمزقات الألياف المجهرية والالتهابات العضلية",
      "انتعاش فوري وزيادة مستويات الطاقة والدوبامين",
      "تقليص زمن الاستشفاء بنسبة تتجاوز 40%",
    ],
    duration: "بروتوكولات زمنية محددة",
    icon: <Snowflake className="w-6 h-6 stroke-[2]" />,
    accent: {
      badge: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      iconBg: "from-sky-400 to-blue-600 text-white",
      borderHover: "hover:border-sky-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]",
    },
  },
  {
    id: "cupping",
    tag: "SPORTS MEDICINE",
    titleAr: "الحجامة الرياضية التخصصية",
    titleEn: "Sports Cupping Therapy",
    description:
      "جلسات حجامة جافة ورطبة تحت إشراف معتمد تستهدف العقد العضلية ونقاط الزناد، لتسريع تصريف الفضلات وتجديد التروية الدموية للأنسجة العميقة.",
    benefits: [
      "فك العقد العضلية المزمنة والتصاقات اللفافة العضلية",
      "تجديد كرات الدم وتنشيط الجهاز المناعي الموضعي",
      "تخفيف آلام الظهر والكتفين الناتجة عن الأحمال العالية",
    ],
    duration: "حجز مسبق مع متخصص",
    icon: <HeartPulse className="w-6 h-6 stroke-[2]" />,
    accent: {
      badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      iconBg: "from-rose-500 to-rose-700 text-white",
      borderHover: "hover:border-rose-500/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.18)]",
    },
  },
  {
    id: "rehab",
    tag: "CLINICAL REHAB",
    titleAr: "التأهيل والعلاج الطبيعي",
    titleEn: "Physiotherapy & Rehabilitation",
    description:
      "برامج علاجية وتأهيلية معتمدة لعلاج الإصابات الرياضية (تمزقات، غضاريف، آلام مفاصل)، وتصحيح الانحرافات القوامية للعودة للأداء الرياضي الآمن.",
    benefits: [
      "فحص قوامي شامل وتحديد نقاط الضعف العضلي",
      "برامج تأهيل حركي خاصة بعد الإصابات الرياضية",
      "جلسات علاج يدوي وتمارين تصحيحية تحت إشراف متخصص",
    ],
    duration: "جلسات تقييم ومتابعة فردية",
    icon: <ShieldPlus className="w-6 h-6 stroke-[2]" />,
    accent: {
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      iconBg: "from-emerald-500 to-teal-700 text-white",
      borderHover: "hover:border-emerald-500/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]",
    },
  },
];

export default function RecoverySpa() {
  return (
    <section
      id="recovery-spa"
      className="relative w-full bg-[#050505] py-28 px-4 md:px-8 border-t border-zinc-900 overflow-hidden font-sans"
      dir="rtl"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f5d77f] text-xs font-bold tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>منظومة الاستشفاء الرياضي والسبا الفاخر</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white mb-4 leading-tight"
          >
            عالم الريكفري في <span className="text-gold">Raven Gym</span>
            <span className="block text-2xl md:text-3xl text-gray-300 font-bold mt-2 font-sans">
              استشفاء متكامل، تأهيل طبي، وراحة تفوق التوقعات
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            التدريب الاحترافي لا يكتمل إلا باستشفاء موازٍ. وفرنا لك في صالة Raven منظومة استشفاء وعلاج طبيعي متكاملة تضمن تجدد طاقتك وعودتك لكل تمرين بأعلى كفاءة.
          </motion.p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {RECOVERY_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`group relative rounded-3xl bg-zinc-950/70 border border-zinc-800/80 p-7 md:p-8 flex flex-col justify-between transition-all duration-300 ${service.accent.borderHover} ${service.accent.glow} hover:bg-zinc-900/60`}
            >
              <div>
                {/* Header: Icon & Category Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0`}
                  >
                    {service.icon}
                  </div>
                  <div className="text-left">
                    <span
                      className={`inline-block px-3 py-1 rounded-full border text-[11px] font-bold tracking-wider font-mono ${service.accent.badge}`}
                    >
                      {service.tag}
                    </span>
                    {service.duration && (
                      <span className="block text-[11px] text-gray-500 mt-1 flex items-center gap-1 justify-end font-medium">
                        <Clock className="w-3 h-3 text-gold/80" />
                        {service.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Titles */}
                <div className="mb-4">
                  <h3 className="text-2xl font-heading font-black text-white group-hover:text-gold transition-colors mb-1">
                    {service.titleAr}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 tracking-wide uppercase">
                    {service.titleEn}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <span className="text-xs font-bold text-gray-400 block mb-2">
                    المزايا والنتائج المباشرة:
                  </span>
                  {service.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed"
                    >
                      <div className="w-4 h-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={`https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمة%20${encodeURIComponent(
                    service.titleAr
                  )}%20في%20Raven%20Gym`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-white transition-colors cursor-pointer"
                >
                  <span>استفسر أو احجز جلستك</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </a>
                <span className="text-[11px] text-gray-500 font-mono">RAVEN RECOVERY</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl bg-gradient-to-r from-zinc-950 via-[#141107] to-zinc-950 border border-[#d4af37]/30 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-right relative z-10">
            <span className="text-xs font-bold text-[#f5d77f] uppercase tracking-wider block">
              خدمات حصرية لكافة المشتركين والرياضيين
            </span>
            <h4 className="text-2xl md:text-3xl font-heading font-black text-white">
              جاهز لتجربة الاستشفاء الرياضي الأعلى مستوى في السنبلاوين؟
            </h4>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              يمكنك حجز جلسات السونا، الجاكوزي، حمام الثلج، أو استشارة العلاج الطبيعي والتأهيل مباشرة مع فريق Raven المتخصص.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 flex-wrap justify-center">
            <a
              href="https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20الريكفري%20والاستشفاء%20في%20Raven%20Gym"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] text-black font-bold text-xs transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center gap-2 cursor-pointer"
            >
              <span>تواصل للاستفسار والحجز</span>
              <ArrowLeft className="w-4 h-4" />
            </a>

            <Link
              href="/subscribe"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-gold text-white font-bold text-xs transition-all hover:bg-zinc-800"
            >
              عرض باقات الاشتراك
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
