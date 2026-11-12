import { getDatabase } from "@/lib/mongodb";
import { membershipPlans } from "@/lib/membership-plans";
import defaults from "@/lib/system-pricing-defaults.json";

export async function getMembershipPlans() {
  const db = await getDatabase();
  // This is the same Raven branch setting used by the management system.
  const setting = await db.collection("settings").findOne({ key: "pricing_config" }, { projection: { value: 1 } });
  return membershipPlans(setting ? setting.value : defaults);
}
