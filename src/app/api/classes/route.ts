import { NextResponse } from "next/server";
import { getClassesSchedule } from "@/lib/classes-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const schedule = await getClassesSchedule();
    const totalCount = Object.values(schedule).reduce((acc, curr) => acc + curr.length, 0);

    return NextResponse.json(
      {
        success: true,
        count: totalCount,
        data: schedule,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Failed to load classes schedule:", error);
    return NextResponse.json(
      {
        success: false,
        error: "تعذر تحميل جدول الحصص من النظام",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

