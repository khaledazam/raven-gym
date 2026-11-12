import { NextResponse } from "next/server";
import { getMembershipPlans } from "@/lib/pricing-server";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return NextResponse.json({ success: true, branchId: "branch-1", plans: await getMembershipPlans() },
      { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ success: false, error: "تعذر تحميل الأسعار الحالية. يرجى إعادة المحاولة." },
      { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
