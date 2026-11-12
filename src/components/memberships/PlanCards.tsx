"use client";
import Link from "next/link";
import { ArrowLeft, Check, Clock3, Dumbbell } from "lucide-react";
import type { MembershipPlan } from "@/lib/membership-plans";

export default function PlanCards({ plans, selectedId, onSelect }: {
  plans: MembershipPlan[]; selectedId?: string; onSelect?: (plan: MembershipPlan) => void;
}) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
    {plans.map(plan => {
      const selected = selectedId === plan.id;
      const Icon = plan.type === "sessions" ? Dumbbell : Clock3;
      const content = <>
        <span className="flex items-start justify-between gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gold/10 text-gold flex items-center justify-center"><Icon className="w-5 h-5" /></span>
          {selected ? <span className="text-gold text-xs font-bold flex items-center gap-1"><Check className="w-4 h-4" /> مختارة</span> : null}
        </span>
        <span className="block text-xl font-bold text-white mt-5">{plan.name}</span>
        <span className="block text-xs text-gray-400 leading-6 mt-2 min-h-12">{plan.description}</span>
        <span className="block text-3xl font-heading font-bold text-gold my-6" dir="rtl">{plan.price.toLocaleString("ar-EG")} <span className="text-sm font-sans">ج.م</span></span>
        <span className={`mt-auto flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold ${selected ? "bg-gold text-black" : "bg-white/5 text-white border border-white/10"}`}>
          {onSelect ? selected ? "الباقة المختارة" : "اختيار الباقة" : "اشترك الآن"}<ArrowLeft className="w-4 h-4" />
        </span>
      </>;
      const style = `text-right rounded-3xl p-6 flex flex-col border transition-colors ${selected ? "bg-gold/5 border-gold shadow-[0_0_25px_rgba(176,138,71,0.15)]" : "bg-[#0a0a0a] border-white/10 hover:border-gold/50"}`;
      return onSelect
        ? <button key={plan.id} type="button" aria-pressed={selected} onClick={() => onSelect(plan)} className={style}>{content}</button>
        : <Link key={plan.id} href={`/subscribe?plan=${encodeURIComponent(plan.id)}`} aria-label={`اشترك في ${plan.name} بسعر ${plan.price} جنيه`} className={style}>{content}</Link>;
    })}
  </div>;
}
