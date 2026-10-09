"use client";

import { useState, useEffect, Suspense, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Copy,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Dumbbell,
  Sparkles,
  Zap,
  Wallet,
  Crown,
  FileText,
  MessageCircle,
  Home,
  RefreshCw,
} from "lucide-react";

interface PlanOption {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  monthlyBasePrice: number;
  highlight?: boolean;
  features: string[];
}

const PLANS: PlanOption[] = [
  {
    id: "train",
    name: "TRAIN",
    nameAr: "باقة التمرين الأساسية",
    tagline: "بناء الاستمرارية وتأسيس القوة البدنية",
    monthlyBasePrice: 800,
    features: [
      "دخول كامل لمنطقة الأجهزة وصالات التدريب",
      "استخدام غرف الملابس والخزائن الشخصية",
      "جلسة قياس InBody ومتابعة شهرية",
      "تطبيق الهاتف لتسجيل التمارين والحضور",
    ],
  },
  {
    id: "transform",
    name: "TRANSFORM",
    nameAr: "باقة التحول الشامل (الأكثر طلباً)",
    tagline: "رحلة متكاملة لتحقيق نتائج مرئية وسريعة",
    monthlyBasePrice: 1400,
    highlight: true,
    features: [
      "كل مميزات باقة TRAIN بالكامل",
      "خطة تغذية مخصصة",
      "برنامج تدريبي مخصص يتجدد شهرياً",
      "متابعة دورية مع كابتن الفريق أسبوعياً",
      "أولوية الحجز في الحصص التدريبية الجماعية",
    ],
  },
  {
    id: "dominate",
    name: "DOMINATE",
    nameAr: "باقة Raven VIP",
    tagline: "التجربة الفاخرة للرياضيين الطموحين لأقصى أداء",
    monthlyBasePrice: 2200,
    features: [
      "كل مميزات باقة TRANSFORM بالكامل",
      "مدرب شخصي مخصص لمتابعة الأداء والتطور",
      "مشروبات طاقة وبروتين شيك مخصص مجاناً أسبوعياً",
      "دخول مجاني للساونا والجاكوزي والاستشفاء",
      "خدمة VIP ومساعدة مخصصة على مدار الساعة",
    ],
  },
];

const DURATIONS = [
  { months: 1, label: "شهر واحد", discountPercent: 0, tag: "مرن" },
  { months: 3, label: "3 شهور", discountPercent: 10, tag: "وفر 10%" },
  { months: 6, label: "6 شهور", discountPercent: 15, tag: "وفر 15%" },
  { months: 12, label: "سنة كاملة", discountPercent: 25, tag: "الأفضل قيمة - وفر 25%" },
];

function SubscribeContent() {
  const searchParams = useSearchParams();
  const preSelectedPlan = searchParams.get("plan");

  const [step, setStep] = useState<number>(1);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "male",
    goal: "hypertrophy",
    medicalNotes: "",
    planId: "transform",
    durationMonths: 1,
    paymentMethod: "vodafone_cash", // "vodafone_cash" | "instapay"
    senderAccount: "",
    transactionRef: "",
    receiptImage: "",
  });

  // Success result
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceCode: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (preSelectedPlan && PLANS.some((p) => p.id === preSelectedPlan)) {
      setFormData((prev) => ({ ...prev, planId: preSelectedPlan }));
    }
  }, [preSelectedPlan]);

  // Pricing calculation
  const currentPlan = PLANS.find((p) => p.id === formData.planId) || PLANS[1];
  const currentDuration =
    DURATIONS.find((d) => d.months === formData.durationMonths) || DURATIONS[0];
  const baseTotal = currentPlan.monthlyBasePrice * currentDuration.months;
  const finalPrice = Math.round(baseTotal * (1 - currentDuration.discountPercent / 100));

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTarget(label);
    setTimeout(() => setCopiedTarget(null), 2500);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, receiptImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg("يرجى ملء الاسم الكامل ورقم الهاتف.");
      setStep(1);
      return;
    }

    if (!formData.senderAccount.trim()) {
      setErrorMsg(
        formData.paymentMethod === "vodafone_cash"
          ? "يرجى كتابة رقم محفظة فودافون كاش التي قمت بالتحويل منها."
          : "يرجى كتابة اسم الحساب أو رقم الهاتف الذي قمت بالتحويل منه عبر إنستاباي."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          planName: currentPlan.name,
          amount: finalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionSuccess({
          referenceCode: data.referenceCode,
          message: data.message,
        });
      } else {
        setErrorMsg(data.error || "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("تعذر الاتصال بالخادم. يرجى التأكد من اتصال الإنترنت أو المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-[#0e0e0e] border border-gold/30 rounded-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(176,138,71,0.2)] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-600 via-gold to-yellow-400" />
          
          <div className="w-20 h-20 bg-gold/10 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>

          <h2 className="font-heading text-3xl font-bold mb-2">تم استلام طلبك بنجاح!</h2>
          <p className="text-gray-400 text-sm mb-6">
            طلب الاشتراك الخاص بك مسجل في سيستم رافن جيم وهو الآن <span className="text-gold font-bold">قيد المراجعة السريعة</span> من فريق الإدارة.
          </p>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 mb-8 text-right space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs text-gray-400">رقم متابعة الطلب:</span>
              <span className="font-mono text-lg font-bold text-gold tracking-wider select-all">
                {submissionSuccess.referenceCode}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">اسم المشترك:</span>
              <span className="font-bold">{formData.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">الباقة المختارة:</span>
              <span className="text-gold font-bold">{currentPlan.name} ({currentDuration.label})</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">المبلغ المحول:</span>
              <span className="font-bold text-white">{finalPrice.toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">طريقة التحويل:</span>
              <span className="text-white font-bold">
                {formData.paymentMethod === "vodafone_cash"
                  ? "فودافون كاش (Vodafone Cash) لرقم 01036605024"
                  : "إنستاباي (InstaPay) لحساب St pop10"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
              <span className="text-gray-400">حالة الطلب:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <RefreshCw className="w-3 h-3 animate-spin" /> قيد التدقيق والمراجعة
              </span>
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 mb-8 text-xs text-gray-300 leading-relaxed text-right">
            ⚡ <span className="text-gold font-bold">ماذا بعد؟</span> سيقوم موظف الاستقبال بمراجعة إيصال التحويل وتأكيد اشتراكك، وستصلك رسالة تأكيد وترحيب عبر الواتساب على رقم هاتفك ({formData.phone}) خلال وقت قصير.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/201017361845?text=${encodeURIComponent(
                `مرحباً رافن جيم، لقد قمت بتقديم طلب اشتراك جديد برقم مرجعي: ${submissionSuccess.referenceCode} باسم: ${formData.fullName} وقمت بالتحويل عبر ${
                  formData.paymentMethod === "vodafone_cash"
                    ? "فودافون كاش لرقم 01036605024"
                    : "إنستاباي لـ St pop10"
                }.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              تأكيد فوري عبر واتساب الجيم
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm"
            >
              <Home className="w-4 h-4" />
              العودة للرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-10 h-10 bg-gold rounded-xl text-black flex items-center justify-center font-heading font-bold text-2xl pt-1 shadow-[0_0_25px_rgba(176,138,71,0.4)] group-hover:scale-105 transition-transform">
              R
            </div>
            <span className="font-heading text-xl font-bold tracking-widest text-white group-hover:text-gold transition-colors">
              RAVEN GYM
            </span>
          </Link>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-3">
            انضم إلى <span className="text-gold">Raven</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            سجل بياناتك واختر باقتك، ثم حوّل قيمة الاشتراك عبر إنستاباي بسهولة لبدء رحلتك التحولية فوراً.
          </p>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
            {[
              { num: 1, title: "البيانات الشخصية", icon: User },
              { num: 2, title: "اختيار الباقة", icon: Dumbbell },
              { num: 3, title: "الدفع (إنستاباي)", icon: Zap },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isPast = step > s.num;

              return (
                <div key={s.num} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (s.num < step) setStep(s.num);
                    }}
                    className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full border text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gold text-black border-gold shadow-[0_0_20px_rgba(176,138,71,0.3)]"
                        : isPast
                        ? "bg-white/10 text-gold border-gold/30 hover:bg-white/15"
                        : "bg-black/50 text-gray-500 border-white/10 opacity-70"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{s.title}</span>
                    {isPast && <Check className="w-3.5 h-3.5" />}
                  </button>
                  {s.num < 3 && <div className="w-4 sm:w-8 h-[1px] bg-white/10 mx-1 sm:mx-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-[#0b0b0b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="border-b border-white/10 pb-4 mb-6">
                <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-gold" /> الخطوة 1: البيانات الشخصية والرياضية
                </h2>
                <p className="text-gray-400 text-xs mt-1">أدخل معلوماتك بدقة لإعداد ملفك الرياضي في رافن جيم.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300">الاسم بالكامل *</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="محمد أحمد علي"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pr-11 pl-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300">رقم الهاتف / الواتساب *</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      required
                      placeholder="010XXXXXXXX"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pr-11 pl-4 text-white focus:outline-none focus:border-gold transition-colors text-sm text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300">البريد الإلكتروني (اختياري)</label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="athlete@example.com"
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pr-11 pl-4 text-white focus:outline-none focus:border-gold transition-colors text-sm text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300">العمر</label>
                    <input
                      type="number"
                      placeholder="25"
                      min={14}
                      max={80}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-gold transition-colors text-sm text-center"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300">النوع</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                    >
                      <option value="male" className="bg-[#111]">ذكر</option>
                      <option value="female" className="bg-[#111]">أنثى</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300">الهدف الرياضي الأساسي</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "hypertrophy", label: "بناء عضلات وتضخيم" },
                    { id: "fat_loss", label: "خسارة وزن وتنشيف" },
                    { id: "fitness", label: "لياقة بدنية ومرونة" },
                    { id: "strength", label: "زيادة القوة البدنية" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: g.id })}
                      className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.goal === g.id
                          ? "bg-gold/20 border-gold text-gold shadow-[0_0_15px_rgba(176,138,71,0.2)]"
                          : "bg-black/40 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300">
                  هل تعاني من أي إصابات سابقة أو حالات صحية؟ (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="مثال: إصابة قديمة بالركبة، ضغط دم، حساسية معينة..."
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-gold transition-colors text-sm placeholder:text-gray-600"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.fullName.trim() || !formData.phone.trim()) {
                      setErrorMsg("يرجى إدخال الاسم ورقم الهاتف للمتابعة.");
                      return;
                    }
                    setErrorMsg("");
                    setStep(2);
                  }}
                  className="bg-gold hover:bg-yellow-500 text-black font-heading font-bold text-sm py-4 px-8 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(176,138,71,0.3)] hover:scale-[1.02]"
                >
                  <span>المتابعة لاختيار الباقة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Plan Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="border-b border-white/10 pb-4 mb-6">
                <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-gold" /> الخطوة 2: باقة الاشتراك ومدة العضوية
                </h2>
                <p className="text-gray-400 text-xs mt-1">اختر باقة التدريب والمدة المناسبة لجدولك وأهدافك.</p>
              </div>

              {/* Duration Tabs */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-300">مدة الاشتراك المطلوبة:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DURATIONS.map((dur) => {
                    const isSelected = formData.durationMonths === dur.months;
                    return (
                      <button
                        key={dur.months}
                        type="button"
                        onClick={() => setFormData({ ...formData, durationMonths: dur.months })}
                        className={`p-3.5 rounded-2xl border text-center transition-all relative overflow-hidden ${
                          isSelected
                            ? "bg-gold text-black border-gold font-bold shadow-[0_0_20px_rgba(176,138,71,0.3)]"
                            : "bg-black/50 border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        <div className="text-sm font-bold">{dur.label}</div>
                        <div className={`text-[10px] mt-1 ${isSelected ? "text-black/80 font-bold" : "text-gold"}`}>
                          {dur.tag}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plans Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => {
                  const isSelected = formData.planId === plan.id;
                  const planBaseTotal = plan.monthlyBasePrice * currentDuration.months;
                  const planCalculatedPrice = Math.round(
                    planBaseTotal * (1 - currentDuration.discountPercent / 100)
                  );

                  return (
                    <div
                      key={plan.id}
                      onClick={() => setFormData({ ...formData, planId: plan.id })}
                      className={`relative rounded-3xl p-6 cursor-pointer transition-all flex flex-col justify-between border ${
                        isSelected
                          ? "bg-gradient-to-b from-[#18150d] to-black border-gold shadow-[0_0_35px_rgba(176,138,71,0.3)] scale-[1.02]"
                          : "bg-black/50 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          الأكثر طلباً
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`font-heading text-2xl font-bold uppercase ${isSelected ? "text-gold" : "text-white"}`}>
                            {plan.name}
                          </h3>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? "border-gold bg-gold text-black" : "border-white/30"}`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <p className="text-gray-400 text-xs mb-4">{plan.tagline}</p>

                        <div className="mb-6 p-3 bg-black/40 border border-white/5 rounded-xl">
                          <div className="text-2xl font-heading font-bold text-white">
                            {planCalculatedPrice.toLocaleString()} <span className="text-xs font-sans text-gold">ج.م</span>
                          </div>
                          <div className="text-[11px] text-gray-500">
                            عن {currentDuration.label}
                            {currentDuration.discountPercent > 0 && (
                              <span className="text-green-400 mr-1.5 font-bold">
                                (وفر {Math.round(planBaseTotal - planCalculatedPrice)} ج.م)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                              <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isSelected ? "text-gold" : "text-gray-500"}`} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-gold text-black"
                            : "bg-white/5 text-gray-300 border border-white/10"
                        }`}
                      >
                        {isSelected ? "الباقة المختارة" : "اختيار هذه الباقة"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Total Summary */}
              <div className="p-5 bg-gold/10 border border-gold/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-400">إجمالي المبلغ المستحق للتحويل:</div>
                  <div className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                    <span className="text-gold">{finalPrice.toLocaleString()} ج.م</span>
                    <span className="text-xs font-sans text-gray-400 font-normal">
                      (باقة {currentPlan.name} - {currentDuration.label})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-5 rounded-xl border border-white/20 text-gray-300 hover:text-white text-xs font-bold transition-all"
                  >
                    السابق
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 sm:flex-none bg-gold hover:bg-yellow-500 text-black font-heading font-bold text-sm py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(176,138,71,0.3)] hover:scale-[1.02]"
                  >
                    <span>متابعة لبيانات التحويل والدفع</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Payment Method & Transfer */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="border-b border-white/10 pb-4 mb-6">
                <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gold" /> الخطوة 3: اختيار طريقة الدفع وتأكيد التحويل
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  اختر طريقة الدفع المناسبة لك (فودافون كاش أو إنستاباي) ثم حوّل قيمة الاشتراك للمراجعة والتفعيل.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vodafone Cash Option */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: "vodafone_cash" })}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between ${
                    formData.paymentMethod === "vodafone_cash"
                      ? "bg-red-500/10 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
                      : "bg-black/50 border-white/10 hover:border-white/20 text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      formData.paymentMethod === "vodafone_cash" ? "bg-red-600 text-white shadow-lg shadow-red-600/30" : "bg-white/10 text-gray-300"
                    }`}>
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-white">فودافون كاش (Vodafone Cash)</div>
                      <div className="text-xs text-red-400 font-mono font-bold mt-0.5" dir="ltr">01036605024</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">تحويل مباشر عبر كود المحفظة أو التطبيق</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.paymentMethod === "vodafone_cash" ? "border-red-500 bg-red-500 text-white" : "border-white/30"
                  }`}>
                    {formData.paymentMethod === "vodafone_cash" && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* InstaPay Option */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: "instapay" })}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between ${
                    formData.paymentMethod === "instapay"
                      ? "bg-gold/10 border-gold shadow-[0_0_25px_rgba(176,138,71,0.25)]"
                      : "bg-black/50 border-white/10 hover:border-white/20 text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      formData.paymentMethod === "instapay" ? "bg-gold text-black shadow-lg shadow-gold/30" : "bg-white/10 text-gray-300"
                    }`}>
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-white">إنستاباي (InstaPay)</div>
                      <div className="text-xs text-gold font-mono font-bold mt-0.5" dir="ltr">St pop10</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">تحويل فوري عبر اسم المستخدم IPA</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.paymentMethod === "instapay" ? "border-gold bg-gold text-black" : "border-white/30"
                  }`}>
                    {formData.paymentMethod === "instapay" && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              </div>

              {/* Target Transfer Card - DYNAMIC BASED ON SELECTION */}
              {formData.paymentMethod === "vodafone_cash" ? (
                /* Vodafone Cash Card */
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1f0a0a] via-[#120a0a] to-[#0a0a0a] border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                  <div className="absolute top-0 left-0 bg-red-600 text-white font-heading font-bold text-[10px] sm:text-xs px-4 py-1.5 rounded-br-2xl uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> محفظة فودافون كاش الرسمية لرافن جيم
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                    <div className="space-y-2 text-center sm:text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-widest font-heading">
                        رقم محفظة التحويل (Vodafone Cash):
                      </div>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <span className="font-mono text-3xl sm:text-4xl font-bold text-red-400 tracking-wider select-all" dir="ltr">
                          01036605024
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText("01036605024", "vodafone")}
                          className="bg-red-500/20 hover:bg-red-500 hover:text-white border border-red-500/40 text-red-400 p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold"
                          title="نسخ رقم فودافون كاش"
                        >
                          {copiedTarget === "vodafone" ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>نسخ الرقم</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start text-xs text-gray-300 pt-1">
                        <span>كود التحويل السريع:</span>
                        <code className="bg-black/60 border border-red-500/30 text-red-300 px-2 py-0.5 rounded font-mono text-xs select-all" dir="ltr">
                          *9*7*01036605024*{finalPrice}#
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopyText(`*9*7*01036605024*${finalPrice}#`, "code")}
                          className="text-[11px] text-gray-400 hover:text-white underline"
                        >
                          {copiedTarget === "code" ? "تم نسخ الكود!" : "نسخ الكود"}
                        </button>
                      </div>
                    </div>

                    <div className="text-center sm:text-left bg-black/60 border border-white/10 rounded-2xl p-4 min-w-[200px]">
                      <div className="text-xs text-gray-400 mb-1">المبلغ المطلوب تحويله:</div>
                      <div className="text-3xl font-heading font-bold text-white">
                        {finalPrice.toLocaleString()} <span className="text-sm font-sans text-red-400">ج.م</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        باقة {currentPlan.name} ({currentDuration.label})
                      </div>
                    </div>
                  </div>

                  {/* Instructions for Vodafone Cash */}
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300">
                    <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
                      <span>اطلب كود التحويل <b className="text-red-400 font-mono" dir="ltr">*9*7*01036605024*{finalPrice}#</b> أو افتح تطبيق <b>أنا فودافون</b>.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
                      <span>أدخل رقمك السري لتأكيد تحويل مبلغ <b className="text-white">{finalPrice} ج.م</b> لرقم <b className="text-red-400 font-mono">01036605024</b>.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">3</span>
                      <span>التقط سكرين شوت لرسالة تأكيد التحويل واكتب رقم محفظتك بالأسفل.</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* InstaPay Card */
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1a150d] via-[#101010] to-[#0a0a0a] border-2 border-gold/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(176,138,71,0.25)]">
                  <div className="absolute top-0 left-0 bg-gold text-black font-heading font-bold text-[10px] sm:text-xs px-4 py-1.5 rounded-br-2xl uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> حساب إنستاباي معتمد لرافن جيم
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                    <div className="space-y-2 text-center sm:text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-widest font-heading">
                        حساب الاستقبال على تطبيق إنستاباي:
                      </div>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <span className="font-mono text-3xl sm:text-4xl font-bold text-gold tracking-wider select-all" dir="ltr">
                          St pop10
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText("St pop10", "instapay")}
                          className="bg-gold/20 hover:bg-gold hover:text-black border border-gold/40 text-gold p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold"
                          title="نسخ اسم المستخدم"
                        >
                          {copiedTarget === "instapay" ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-xs text-gray-400">
                        عنوان الدفع (IPA / Username): <span className="font-mono text-white">St pop10@instapay</span>
                      </div>
                    </div>

                    <div className="text-center sm:text-left bg-black/60 border border-white/10 rounded-2xl p-4 min-w-[200px]">
                      <div className="text-xs text-gray-400 mb-1">المبلغ المطلوب تحويله:</div>
                      <div className="text-3xl font-heading font-bold text-white">
                        {finalPrice.toLocaleString()} <span className="text-sm font-sans text-gold">ج.م</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        باقة {currentPlan.name} ({currentDuration.label})
                      </div>
                    </div>
                  </div>

                  {/* Instructions for InstaPay */}
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300">
                    <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
                      <span>افتح تطبيق إنستاباي واختر <b>تحويل إلى عنوان دفع / اسم مستخدم</b>.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
                      <span>ضع اسم المستخدم: <b className="text-gold font-mono">St pop10</b> وحوّل مبلغ <b className="text-white">{finalPrice} ج.م</b>.</span>
                    </div>
                    <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-bold flex-shrink-0">3</span>
                      <span>التقط صورة لإيصال التحويل واكتب اسم حسابك أدناه لتأكيد طلبك.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Proof Inputs */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300">
                      {formData.paymentMethod === "vodafone_cash"
                        ? "رقم محفظة فودافون كاش التي قمت بالتحويل منها *"
                        : "اسم الحساب أو رقم الهاتف المحول منه على إنستاباي *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        formData.paymentMethod === "vodafone_cash"
                          ? "مثال: 010XXXXXXXX"
                          : "مثال: Mohamed Ali أو 010XXXXXXXX"
                      }
                      value={formData.senderAccount}
                      onChange={(e) => setFormData({ ...formData, senderAccount: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                    <span className="text-[11px] text-gray-500">
                      {formData.paymentMethod === "vodafone_cash"
                        ? "رقم هاتفك صاحب المحفظة لمطابقة إشعار استلام كاش."
                        : "الاسم أو الرقم الذي يظهر في إشعار التحويل للتأكد منه في السيستم."}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300">
                      {formData.paymentMethod === "vodafone_cash"
                        ? "رقم عملية التحويل من رسالة فودافون كاش (اختياري)"
                        : "رقم العملية / الرقم المرجعي من إنستاباي (اختياري)"}
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: Ref #94827103"
                      value={formData.transactionRef}
                      onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-gold transition-colors text-sm font-mono"
                    />
                    <span className="text-[11px] text-gray-500">
                      الرقم المرجعي المطبوع في رسالة التأكيد بعد التحويل.
                    </span>
                  </div>
                </div>

                {/* Upload Receipt */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300">
                    صورة إيصال التحويل (سكرين شوت)
                  </label>
                  
                  {formData.receiptImage ? (
                    <div className="relative border border-gold/40 rounded-2xl p-4 bg-black/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={formData.receiptImage}
                          alt="إيصال التحويل"
                          className="w-16 h-16 object-cover rounded-xl border border-white/10"
                        />
                        <div>
                          <div className="text-xs font-bold text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> تم إرفاق صورة الإيصال بنجاح
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1">
                            جاهز للإرسال والمراجعة من قبل الإدارة
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, receiptImage: "" })}
                        className="text-xs text-red-400 hover:text-red-300 p-2"
                      >
                        حذف وتغيير الصورة
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-white/20 hover:border-gold/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/30 hover:bg-white/5 transition-all text-center">
                      <Upload className="w-8 h-8 text-gold mb-2" />
                      <div className="text-xs font-bold text-white mb-1">اضغط هنا لرفع صورة إيصال التحويل</div>
                      <div className="text-[11px] text-gray-500">PNG, JPG حتى 5 ميجابايت</div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-6 rounded-xl border border-white/20 text-gray-300 hover:text-white text-xs font-bold transition-all w-full sm:w-auto"
                >
                  الرجوع لتعديل الباقة
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-gold text-black font-heading font-bold text-base py-4 px-10 rounded-xl flex items-center justify-center gap-3 transition-all shadow-[0_0_35px_rgba(176,138,71,0.4)] hover:scale-[1.02] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>جاري إرسال الطلب وحفظه في السيستم...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>إرسال طلب الاشتراك للمراجعة</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Footer help */}
        <div className="mt-8 text-center text-xs text-gray-500">
          هل تواجه صعوبة في التحويل؟ يمكنك التواصل مباشرة مع خدمة العملاء على واتساب:{" "}
          <a
            href="https://wa.me/201017361845"
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:underline font-mono"
            dir="ltr"
          >
            +20 101 736 1845
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-gold font-heading text-xl">
          جاري تحميل نظام الاشتراك...
        </div>
      }
    >
      <SubscribeContent />
    </Suspense>
  );
}
