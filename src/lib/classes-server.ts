import { getDatabase } from "@/lib/mongodb";

export interface WorkoutClass {
  id: string;
  name: string;
  time: string;
  duration: string;
  intensity: "High" | "Medium" | "Low";
  room: string;
  description: string;
  price?: number;
  capacity?: number;
  trainerName?: string;
  dayOfWeek?: string;
}

export function formatArabicTime(time24: string): string {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr ? mStr.padStart(2, "0") : "00";
  if (isNaN(h)) return time24;
  const isPM = h >= 12;
  h = h % 12;
  if (h === 0) h = 12;
  const hFormatted = h.toString().padStart(2, "0");
  return `${hFormatted}:${m} ${isPM ? "م" : "ص"}`;
}

export function calculateDuration(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return "60 دقيقة";
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  if (isNaN(sh) || isNaN(eh)) return "60 دقيقة";
  let diff = (eh * 60 + (em || 0)) - (sh * 60 + (sm || 0));
  if (diff <= 0) diff += 24 * 60;
  if (diff >= 60 && diff % 60 === 0) {
    const hours = diff / 60;
    return hours === 1 ? "ساعة واحدة" : hours === 2 ? "ساعتان" : `${hours} ساعات`;
  }
  return `${diff} دقيقة`;
}

export function determineIntensity(name: string): "High" | "Medium" | "Low" {
  const lower = (name || "").toLowerCase();
  if (/ملاكمة|boxing|hiit|crossfit|كروس|power|باور|رفع|heavy|قتال|combat|أثقال|حديد/i.test(lower)) {
    return "High";
  }
  if (/يوجا|yoga|مرونة|mobility|استشفاء|recovery|stretch|إطالات/i.test(lower)) {
    return "Low";
  }
  return "Medium";
}

export async function getClassesSchedule(): Promise<Record<string, WorkoutClass[]>> {
  const db = await getDatabase();
  const rawClasses = await db
    .collection("classes")
    .aggregate([
      { $match: { isActive: { $ne: false } } },
      {
        $lookup: {
          from: "trainers",
          let: { tId: "$trainer" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$_id", "$$tId"] },
                    { $eq: [{ $toString: "$_id" }, { $toString: "$$tId" }] }
                  ]
                }
              }
            }
          ],
          as: "trainerInfo"
        }
      },
      {
        $unwind: {
          path: "$trainerInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      { $sort: { startTime: 1 } }
    ])
    .toArray();

  const schedule: Record<string, WorkoutClass[]> = {
    Saturday: [],
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  };

  for (const item of rawClasses) {
    const day = (item.dayOfWeek as string) || "Saturday";
    if (!schedule[day]) {
      schedule[day] = [];
    }

    const trainerName = item.trainerInfo?.name || "كابتن الجيم";
    const trainerSpecialty = item.trainerInfo?.specialty ? ` (${item.trainerInfo.specialty})` : "";
    const startFormatted = formatArabicTime(item.startTime);
    const endFormatted = formatArabicTime(item.endTime);
    const timeDisplay = startFormatted && endFormatted ? `${startFormatted} - ${endFormatted}` : (item.startTime || "");

    schedule[day].push({
      id: item._id.toString(),
      name: item.name,
      time: timeDisplay,
      duration: calculateDuration(item.startTime, item.endTime),
      intensity: determineIntensity(item.name),
      room: `المدرب: كابتن ${trainerName}${trainerSpecialty}`,
      description: `حصة ${item.name} الجماعية بإشراف كابتن ${trainerName}. سعة الحصة: ${item.capacity || 20} مشترك.${item.price > 0 ? ` السعر للحصة: ${item.price} ج.م.` : " متاحة لمشتركي الجيم."}`,
      price: item.price || 0,
      capacity: item.capacity || 20,
      trainerName,
      dayOfWeek: day
    });
  }

  return schedule;
}

