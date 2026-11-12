"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, RefreshCw } from "lucide-react";
import PlanCards from "@/components/memberships/PlanCards";
import { useMembershipPlans } from "@/lib/use-membership-plans";

export default function Memberships() {
  const [type, setType] = useState<"time" | "sessions">("time");
  const { plans, loading, error, refresh } = useMembershipPlans();
  return <section id="memberships" className="relative z-10 bg-[#050505] py-24 px-4 md:px-6 font-sans" dir="rtl">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <p className="text-gold text-xs font-bold tracking-widest mb-4">RAVEN MEMBERSHIPS</p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">اختار <span className="text-gold">اللي يناسب تمرينك</span></h2>
        <p className="mt-5 text-gray-400 leading-8">اشتراك بالمدة أو باقة حصص؛ سعر واضح وصلاحية محددة لكل باقة.</p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-3 mb-10" aria-label="نوع الاشتراك">
        {([{ id: "time", label: "الاشتراكات الشهرية" }, { id: "sessions", label: "باقات السيشنات" }] as const).map(item =>
          <button key={item.id} type="button" aria-pressed={type === item.id} onClick={() => setType(item.id)}
            className={`rounded-full px-7 py-3 font-bold text-sm border transition-colors ${type === item.id ? "bg-gold text-black border-gold" : "border-white/15 text-gray-300 hover:border-gold/50"}`}>{item.label}</button>)}
      </div>
      {loading ? <p role="status" className="text-center text-gray-400 py-16"><Loader2 className="w-6 h-6 animate-spin inline-block ml-2" />جاري تحميل الباقات والأسعار...</p>
        : error ? <div role="alert" className="text-center rounded-3xl border border-white/10 p-10 text-gray-300"><p>{error}</p><button type="button" onClick={refresh} className="mt-5 text-gold inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" />إعادة المحاولة</button></div>
        : plans.some(plan => plan.type === type) ? <PlanCards plans={plans.filter(plan => plan.type === type)} />
        : <p className="text-center text-gray-400 py-12">لا توجد باقات متاحة من هذا النوع حاليًا.</p>}
    </div>
  </section>;
}
