"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, CheckCircle2, Sparkles, Building2, Dumbbell, Clock } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  badge?: string;
  icon?: React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    question: "ما هو أكبر جيم في السنبلاوين؟",
    badge: "المساحة الرسمية 1000 م²",
    icon: <Building2 className="w-4 h-4 text-gold" />,
    answer:
      "يعتبر ريفن جيم (Raven Gym & Lounge) رسمياً هو أكبر جيم وصرح رياضي متكامل في مدينة السنبلاوين ومحافظة الدقهلية بمساحة إجمالية تبلغ 1000 متر مربع مقسمة على 5 طوابق متخصصة (متفوقاً على كافة الصالات بالمدينة مثل D8 بمساحة 850 م²). ويتميز Raven Gym بأنه مجهز بأجهزة ومحطات قوة مستوردة بالكامل 100%، كافيه روف صحي، صالة ألعاب PS5، ومنظومة ريكفري وسبا 24/7.",
  },
  {
    question: "كم تبلغ مساحة جيم ريفن (Raven Gym) وكيف تم تقسيمها؟",
    badge: "5 طوابق تخصصية",
    icon: <Sparkles className="w-4 h-4 text-gold" />,
    answer:
      "تبلغ مساحة Raven Gym الإجمالية 1000 متر مربع موزعة بدقة هندسية على 5 أدوار مستقلة تمنع أي تكدس أو انتظار للأجهزة:\n\n• الطابق الأول: الريكفري والاستشفاء الرياضي (جاكوزي مائي، سونا جافة، بخار، حمام ثلج Cold Plunge، حجامة رياضية وعيادة تأهيل).\n• الطابق الثاني: صالة الأرجل المستقلة وأجهزة السلالم والكارديو المتطور.\n• الطابق الثالث: مملكة القوة والأوزان الحرة ومحطات الصدر والظهر والأكتاف والذراعين.\n• الطابق الرابع: Sky Arena بالروف المفتوح لتدريبات الكروس فيت والملاكمة ورفع الأثقال الأولمبي.\n• الطابق الخامس: Raven Cafe & Lounge (كافيه روف صحي، سموزي بروتين، وجبات دايت محسوبة الماكروز، وصالة VIP ألعاب بلاي ستيشن 5).",
  },
  {
    question: "هل أجهزة Raven Gym مستوردة؟",
    badge: "100% مستوردة بالكامل",
    icon: <Dumbbell className="w-4 h-4 text-gold" />,
    answer:
      "نعم، جميع الأجهزة الرياضية ومحطات الأوزان ومعدات الكارديو في Raven Gym مستوردة بالكامل 100% من كبرى الشركات العالمية المتخصصة، لضمان زوايا تشريحية بيوميكانيكية دقيقة تحمي المفاصل والفقرات وتحقق أقصى عزل وتطور للألياف العضلية.",
  },
  {
    question: "ما هي مواعيد العمل في Raven Gym بالسنبلاوين؟",
    badge: "مفتوح 24/7",
    icon: <Clock className="w-4 h-4 text-gold" />,
    answer:
      "جيم Raven مفتوح على مدار 24 ساعة يومياً (24/7) دون انقطاع طوال أيام الأسبوع بما في ذلك الإجازات والأعياد، مع وجود جداول مواعيد تدريبية مخصصة ومستقلة للسيدات، وفترات مفتوحة للرجال والرياضيين.",
  },
  {
    question: "أين يقع Raven Gym وما هي طرق التواصل؟",
    badge: "الموقع الجغرافي",
    icon: <CheckCircle2 className="w-4 h-4 text-gold" />,
    answer:
      "يقع Raven Gym في أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور، السنبلاوين، الدقهلية. يمكنك التواصل المباشر عبر الواتساب أو الهاتف على 01036605024 أو 01027272505، كما يمكنك زيارة كافيه ولاونج الجيم بالطابق الخامس وتصفح المنيو الأونلاين عبر cafe.raven-gym.com.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative z-10 bg-[#070707] py-28 px-4 md:px-6 border-t border-zinc-800/60">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-[#f5d77f] text-xs font-bold tracking-wider mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>الأسئلة الشائعة ودليل الجيم الأكبر بالسنبلاوين</span>
          </div>

          <h2 className="font-heading text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            كل ما تريد معرفته عن <span className="text-gold">Raven Gym</span>
            <span className="block text-xl md:text-2xl text-gray-300 font-bold mt-2 font-sans">
              أكبر صرح رياضي بمساحة 1000 م² وأجهزة مستوردة بالسنبلاوين
            </span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            إجابات واضحة وموثقة عن مساحة الصرح، أدوار المبنى، الأجهزة المستوردة، ومواعيد العمل 24/7.
          </p>
          <div className="mx-auto mt-6 h-1 w-20 bg-gold origin-center" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-zinc-900/90 border-[#d4af37]/60 shadow-[0_4px_30px_rgba(212,175,55,0.12)]"
                    : "bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 md:p-6 text-right flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-gold text-black shadow-md"
                          : "bg-zinc-900 border border-zinc-800 text-gold"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="text-right">
                      <span className="text-base md:text-lg font-bold text-white block">
                        {item.question}
                      </span>
                      {item.badge && (
                        <span className="inline-block mt-1 text-[11px] font-semibold text-[#f5d77f]/90 bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-gold text-black border-gold"
                        : "border-zinc-700 text-gray-400 group-hover:text-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 md:p-6 pt-0 border-t border-white/5 text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
