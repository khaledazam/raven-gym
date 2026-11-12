export interface PricingConfig {
  time: Record<string, number>;
  sessions: { id: string; sessions: number; price: number; validityDays: number; label: string }[];
}
export interface MembershipPlan {
  id: string;
  type: "time" | "sessions";
  name: string;
  price: number;
  durationMonths: number;
  totalSessions: number;
  sessionPackageId: string | null;
  validityDays: number;
  description: string;
}
export function durationLabel(months: number): string {
  if (months === 1) return "شهر واحد";
  if (months === 2) return "شهران";
  if (months === 12) return "سنة كاملة";
  return `${months} أشهر`;
}
export function membershipPlans(value: unknown): MembershipPlan[] {
  if (!value || typeof value !== "object") throw new Error("invalid_pricing");
  const pricing = value as PricingConfig;
  if (!pricing.time || typeof pricing.time !== "object" || Array.isArray(pricing.time) || !Array.isArray(pricing.sessions)) throw new Error("invalid_pricing");
  const plans: MembershipPlan[] = [];
  for (const [key, price] of Object.entries(pricing.time)) {
    const months = Number(key);
    if (!/^\d+$/.test(key) || !Number.isSafeInteger(months) || months < 1 || typeof price !== "number" || !Number.isFinite(price) || price < 0) throw new Error("invalid_pricing");
    plans.push({ id: `time-${months}`, type: "time", name: durationLabel(months), price,
      durationMonths: months, totalSessions: 0, sessionPackageId: null, validityDays: months * 30,
      description: `اشتراك زمني لمدة ${months * 30} يومًا` });
  }
  plans.sort((a, b) => a.durationMonths - b.durationMonths);
  const ids = new Set<string>();
  for (const item of pricing.sessions) {
    if (!item || typeof item.id !== "string" || !item.id.trim() || ids.has(item.id) ||
      !Number.isSafeInteger(item.sessions) || item.sessions < 1 || typeof item.price !== "number" || !Number.isFinite(item.price) || item.price < 0 ||
      !Number.isSafeInteger(item.validityDays) || item.validityDays < 0 || typeof item.label !== "string" || !item.label.trim()) throw new Error("invalid_pricing");
    ids.add(item.id);
    plans.push({ id: `sessions-${item.id}`, type: "sessions", name: item.label, price: item.price,
      durationMonths: 0, totalSessions: item.sessions, sessionPackageId: item.id, validityDays: item.validityDays,
      description: `${item.sessions} حصة · ${item.validityDays > 0 ? `صلاحية ${item.validityDays} يومًا` : "بدون مدة صلاحية محددة"}` });
  }
  return plans;
}
export function isMembershipPlan(value: unknown): value is MembershipPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as MembershipPlan;
  return typeof plan.id === "string" && typeof plan.name === "string" && typeof plan.description === "string" &&
    (plan.type === "time" || plan.type === "sessions") && typeof plan.price === "number" && Number.isFinite(plan.price) && plan.price >= 0 &&
    Number.isSafeInteger(plan.durationMonths) && Number.isSafeInteger(plan.totalSessions) && Number.isSafeInteger(plan.validityDays) && plan.validityDays >= 0 &&
    (plan.type === "time" ? plan.durationMonths > 0 && plan.totalSessions === 0 : plan.durationMonths === 0 && plan.totalSessions > 0 && typeof plan.sessionPackageId === "string");
}
export function selectedMembership(plans: MembershipPlan[], planId: unknown, quotedAmount: unknown): MembershipPlan | null {
  if (typeof planId !== "string" || typeof quotedAmount !== "number" || !Number.isFinite(quotedAmount)) return null;
  return plans.find(plan => plan.id === planId && plan.price === quotedAmount) || null;
}
