"use client";
import { useCallback, useEffect, useState } from "react";
import { isMembershipPlan, type MembershipPlan } from "@/lib/membership-plans";

export function useMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/pricing", { cache: "no-store", signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success || !Array.isArray(result.plans) || !result.plans.length || !result.plans.every(isMembershipPlan)) throw new Error("pricing_unavailable");
        if (!controller.signal.aborted) setPlans(result.plans);
      } catch {
        if (!controller.signal.aborted) { setPlans([]); setError("تعذر تحميل الأسعار الحالية. حاول مرة أخرى."); }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [revision]);
  return { plans, loading, error, refresh };
}
