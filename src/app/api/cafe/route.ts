import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CAFE_ORIGIN = "https://cafe.raven-gym.com";

export async function GET() {
  try {
    const [categoriesRes, productsRes, devicesRes] = await Promise.allSettled([
      fetch(`${CAFE_ORIGIN}/api/categories`, { cache: "no-store", headers: { Accept: "application/json" } }),
      fetch(`${CAFE_ORIGIN}/api/products?limit=100`, { cache: "no-store", headers: { Accept: "application/json" } }),
      fetch(`${CAFE_ORIGIN}/api/devices`, { cache: "no-store", headers: { Accept: "application/json" } }),
    ]);

    let categories: Array<{ id: string; name: string }> = [];
    let products: Array<any> = [];
    let devices: Array<any> = [];

    if (categoriesRes.status === "fulfilled" && categoriesRes.value.ok) {
      const data = await categoriesRes.value.json();
      categories = data.data || [];
    }

    if (productsRes.status === "fulfilled" && productsRes.value.ok) {
      const data = await productsRes.value.json();
      products = data.data || [];
    }

    if (devicesRes.status === "fulfilled" && devicesRes.value.ok) {
      const data = await devicesRes.value.json();
      devices = data.data || [];
    }

    return NextResponse.json(
      {
        success: true,
        origin: CAFE_ORIGIN,
        categories,
        products,
        devices,
        totalProducts: products.length,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Failed to proxy cafe data:", error);
    return NextResponse.json(
      {
        success: false,
        origin: CAFE_ORIGIN,
        categories: [],
        products: [],
        devices: [],
        error: "تعذر الاتصال بسيستم الكافيه حالياً",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
