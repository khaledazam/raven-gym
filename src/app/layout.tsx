import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const tajawal = Tajawal({
  variable: "--font-sans",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "optional",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-heading",
  subsets: ["arabic"],
  weight: ["700", "900"],
  display: "optional",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raven-gym.com"),
  title: {
    default: "Raven Gym & Lounge | ريفن جيم وكافيه - أفضل جيم وكافيه صحي بالسنبلاوين 24/7",
    template: "%s | Raven Gym & Lounge - ريفن جيم وكافيه",
  },
  description:
    "مجمع Raven Gym الرياضي و Raven Cafe & Lounge بالسنبلاوين (أول المشاية). 5 طوابق متكاملة: أجهزة عالمية 24/7، كافيه روف وبروتين بار ومكملات، وجبات صحية دايت، صالة ألعاب PS5، ريكفري وسبا (جاكوزي، سونا، حمام ثلج، حجامة) بإشراف كابتن محمد عبدالعاطي.",
  keywords: [
    // Official Names & Gym Branding
    "Raven",
    "Raven Gym",
    "Raven Cafe",
    "Raven Lounge",
    "Raven Cafe & Lounge",
    "ريفن",
    "ريفن جيم",
    "جيم ريفن",
    "كافيه ريفن",
    "لاونج ريفن",
    "كافيه ريفن جيم",
    "جيم ريفن الرياضي",
    "جيم السنبلاوين",
    "جيم بالسنبلاوين",
    "جيم أول المشاية",
    "افضل جيم في السنبلاوين",
    "احسن جيم في السنبلاوين",
    "جيم 5 نجوم السنبلاوين",
    "جيم 24 ساعة السنبلاوين",
    "جيمات الدقهلية",

    // Common Arabic Misspellings & Variations
    "رافن",
    "رافن جيم",
    "جيم رافن",
    "جيم رافن السنبلاوين",
    "ريفين",
    "ريفين جيم",
    "جيم ريفين",
    "جيم ريفين السنبلاوين",
    "رافين",
    "رافين جيم",
    "جيم رافين",
    "جم ريفن",
    "جم رافن",
    "جم ريفين",
    "جم السنبلاوين",
    "رفن",
    "رفن جيم",
    "جيم رفن",
    "ريڤن",
    "ريڤن جيم",
    "جيم ريڤن",

    // English Misspellings & Keywords
    "Ravin",
    "Ravin Gym",
    "RavinGym",
    "Ravin Gym Sinbillawin",
    "Reven",
    "Reven Gym",
    "RevenGym",
    "Ravan",
    "Ravan Gym",
    "Raven Jim",
    "Ravin Jim",
    "Reven Jim",
    "RavenGim",
    "RavenGym",
    "Raven Egypt",
    "Raven Cafe Egypt",
    "Raven Lounge Egypt",

    // Keyboard Mismatch
    "قشرثى",
    "قشرثى لنى",
    "vdik [dl",

    // Cafe, Restaurant, Healthy Dining & Lounge (المطعم والكافيه والصحي)
    "كافيه السنبلاوين",
    "كافيهات السنبلاوين",
    "افضل كافيه في السنبلاوين",
    "احسن كافيه في السنبلاوين",
    "كافيه روف السنبلاوين",
    "كافيه روف مفتوح",
    "كافيه جيم السنبلاوين",
    "لاونج السنبلاوين",
    "مطعم السنبلاوين",
    "مطاعم السنبلاوين",
    "مطعم صحي السنبلاوين",
    "اكل صحي السنبلاوين",
    "مطعم دايت السنبلاوين",
    "وجبات دايت السنبلاوين",
    "وجبات صحية السنبلاوين",
    "وجبات رياضيين السنبلاوين",
    "وجبات ماكروز السنبلاوين",
    "اكل هيلثي السنبلاوين",
    "قهوة مختصة السنبلاوين",
    "اسبريسو السنبلاوين",
    "سبانش لاتيه السنبلاوين",
    "امريكانو السنبلاوين",

    // Protein Bar & Supplements (البروتين والمكملات والسموزي)
    "بروتين بار السنبلاوين",
    "بروتين شيك السنبلاوين",
    "شيك بروتين طبيعي",
    "سموزي بروتين السنبلاوين",
    "واي بروتين السنبلاوين",
    "ماس جينر السنبلاوين",
    "مكملات غذائية السنبلاوين",
    "محلات مكملات غذائية السنبلاوين",
    "شوب مكملات السنبلاوين",
    "كرياتين السنبلاوين",
    "بري ورك اوت السنبلاوين",
    "BCAA السنبلاوين",
    "بروتين بار صحي",
    "كوكيز بروتين صحي",
    "وجبة شوفان دايت",
    "زبادي يوناني بالعسل",
    "مشروبات طاقة صحية",
    "ريد بول زيرو السنبلاوين",

    // Gaming & Entertainment (البلايستيشن والترفيه)
    "بلاي ستيشن السنبلاوين",
    "بلايستيشن السنبلاوين",
    "PS5 السنبلاوين",
    "غرف بلايستيشن VIP السنبلاوين",
    "كافيه بلايستيشن السنبلاوين",
    "Gaming Lounge Sinbillawin",

    // Sports, Spa & Activities (الرياضة والأنشطة والسبا)
    "كروس فيت السنبلاوين",
    "CrossFit السنبلاوين",
    "ملاكمة السنبلاوين",
    "Boxing السنبلاوين",
    "جيم روف في الهواء الطلق",
    "Open Air Gym السنبلاوين",
    "Raven Sky Arena",
    "Raven Sky Cafe",
    "سبا السنبلاوين",
    "جاكوزي السنبلاوين",
    "سونا السنبلاوين",
    "حمام ثلج السنبلاوين",
    "حجامة رياضية السنبلاوين",
    "تأهيل حركي وعلاج طبيعي السنبلاوين",
    "كابتن محمد عبدالعاطي",
    "اشتراك جيم ريفن",
    "باقات جيم ريفن",
    "لياقة بدنية السنبلاوين",
    "تدريب كمال اجسام السنبلاوين",

    // Top Rated & Reviews (التقييمات العالية)
    "Top Rated Gym Sinbillawin",
    "Top Rated Cafe Sinbillawin",
    "تقييمات ريفن جيم",
    "تقييمات كافيه ريفن",
    "احسن تقييم جيم بالسنبلاوين",
  ],
  authors: [{ name: "كابتن محمد عبدالعاطي (Mohamed Abdelaty)" }],
  creator: "Raven Gym & Lounge",
  publisher: "Raven Gym & Lounge",
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Raven Gym & Lounge | ريفن جيم وكافيه - المنظومة الرياضية واللاونج الصحي بالسنبلاوين",
    description:
      "أقوى جيم وكافيه روف بالسنبلاوين (أول المشاية). 5 طوابق متكاملة: أجهزة 24 ساعة، كافيه روف وبروتين بار ومكملات، وجبات صحية، صالة PS5، جاكوزي وسونا وحمام ثلج بإشراف كابتن محمد عبدالعاطي.",
    url: "https://www.raven-gym.com",
    siteName: "Raven Gym & Lounge | ريفن جيم وكافيه",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raven Gym & Lounge - ريفن جيم وكافيه",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raven Gym & Lounge | ريفن جيم وكافيه 24/7 بالسنبلاوين",
    description:
      "جيم وكافيه Raven Gym & Lounge بالسنبلاوين. تدريب رياضي 24 ساعة، كافيه روف وبروتين بار، وجبات دايت، صالة PS5، ومنظومة ريكفري متكاملة.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "1znth3vzOYVkqahoEAYDOk6ssDom8tdtFQY3joprldU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Core ExerciseGym / SportsClub
    {
      "@type": ["ExerciseGym", "SportsClub", "HealthClub"],
      "@id": "https://www.raven-gym.com/#gym",
      name: "Raven Gym",
      alternateName: [
        "ريفن جيم",
        "جيم ريفن",
        "Raven",
        "ريفن",
        "جيم ريفن الرياضي",
        "Raven Gym Sinbillawin",
        "جيم رافن",
        "رافن جيم",
        "جيم ريفين",
        "ريفين جيم",
        "جم ريفن",
        "رفن جيم",
        "ريڤن جيم",
        "Ravin Gym",
        "Reven Gym",
        "Ravan Gym",
      ],
      url: "https://www.raven-gym.com",
      logo: "https://www.raven-gym.com/logo.png",
      image: [
        "https://www.raven-gym.com/logo.png",
        "https://www.raven-gym.com/images/sky_arena_main.png",
        "https://www.raven-gym.com/images/strength_arena.png",
        "https://www.raven-gym.com/images/cardio_loft.png",
      ],
      description:
        "جيم Raven Gym الرياضي بالسنبلاوين - أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور. تدريب متكامل 24/7، برامج تغذية ذكية، ريكفري وسبا، تحت إشراف كابتن محمد عبدالعاطي.",
      telephone: "+201036605024",
      priceRange: "$$",
      currenciesAccepted: "EGP",
      paymentAccepted: "Cash, InstaPay, Credit Card, Vodafone Cash",
      address: {
        "@type": "PostalAddress",
        streetAddress: "أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور",
        addressLocality: "السنبلاوين",
        addressRegion: "الدقهلية",
        postalCode: "35661",
        addressCountry: "EG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 30.884098,
        longitude: 31.457378,
      },
      hasMap: "https://www.google.com/maps?q=30.884098,31.457378",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      // Google Top Rated Rich Snippets
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "284",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", "name": "كابتن أحمد الشربيني" },
          reviewRating: { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          reviewBody: "أفضل جيم في السنبلاوين بلا منازع. تجهيزات الروف والكروس فيت والاستشفاء والسبا على أعلى مستوى، وكافيه الروف ممتاز جداً بعد التمرين.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", "name": "محمود طارق" },
          reviewRating: { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          reviewBody: "مجمع رياضي وصحي متكامل 5 طوابق، أجهزة حديثة وشيكات البروتين والقهوة في كافيه اللاونج ممتازة وخدمة محترفة 24 ساعة.",
        },
      ],
      founder: {
        "@type": "Person",
        name: "كابتن محمد عبدالعاطي",
        jobTitle: "Head Coach & Founder",
      },
      sameAs: [
        "https://cafe.raven-gym.com",
        "https://wa.me/201036605024",
        "https://wa.me/201027272505",
        "https://instagram.com/raven_gym1",
        "https://www.tiktok.com/@raven.gym",
        "https://www.facebook.com/share/1C15kFpH3U/?mibextid=wwXIfr",
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "مفتوح 24 ساعة (24/7)", value: true },
        { "@type": "LocationFeatureSpecification", name: "كافيه روف ولاونج صحي (Raven Cafe & Lounge)", value: true },
        { "@type": "LocationFeatureSpecification", name: "بروتين بار ومكملات طاقة (Protein Bar & Smoothies)", value: true },
        { "@type": "LocationFeatureSpecification", name: "صالة ألعاب وبلاي ستيشن 5 (PS5 Gaming Lounge)", value: true },
        { "@type": "LocationFeatureSpecification", name: "وجبات دايت وصحية محسوبة الماكروز", value: true },
        { "@type": "LocationFeatureSpecification", name: "جاكوزي مائي ساخن (Hydrotherapy Jacuzzi)", value: true },
        { "@type": "LocationFeatureSpecification", name: "سونا جافة (Dry Sauna)", value: true },
        { "@type": "LocationFeatureSpecification", name: "غرفة بخار رطب (Steam Room)", value: true },
        { "@type": "LocationFeatureSpecification", name: "حمام ثلج رياضي (Athletic Ice Bath)", value: true },
        { "@type": "LocationFeatureSpecification", name: "حجامة رياضية وتأهيل حركي", value: true },
        { "@type": "LocationFeatureSpecification", name: "ساحة تدريب مفتوح بالروف (Open-Air Sky Arena)", value: true },
        { "@type": "LocationFeatureSpecification", name: "محطة كروس فيت ورفع أثقال أولمبي (CrossFit Rig)", value: true },
        { "@type": "LocationFeatureSpecification", name: "طابق كامل لأجهزة الأرجل والكارديو", value: true },
        { "@type": "LocationFeatureSpecification", name: "طابق كامل للأوزان الحرة والقوة", value: true },
      ],
    },

    // 2. Raven Cafe & Lounge (Restaurant & Cafe Schema for Google Search Food/Cafe Queries)
    {
      "@type": ["CafeOrCoffeeShop", "Restaurant", "FoodEstablishment"],
      "@id": "https://www.raven-gym.com/#cafe",
      name: "Raven Cafe & Lounge | كافيه ولاونج ريفن",
      alternateName: [
        "كافيه ريفن",
        "Raven Cafe",
        "Raven Lounge",
        "كافيه ريفن جيم",
        "بروتين بار ريفن",
        "لاونج ريفن السنبلاوين",
        "كافيه روف ريفن",
      ],
      url: "https://cafe.raven-gym.com",
      hasMenu: "https://cafe.raven-gym.com",
      menu: "https://cafe.raven-gym.com",
      telephone: "+201036605024",
      description:
        "كافيه ولاونج Raven Cafe الصحي بالسنبلاوين (الطابق الخامس بروف ريفن جيم). يقدم شيكات البروتين الطبيعية، المكملات ومشروبات الطاقة، القهوة المختصة، الوجبات الصحية المحسوبة، مع صالة ألعاب وبلاي ستيشن 5.",
      servesCuisine: [
        "Healthy Food",
        "Protein Shakes & Smoothies",
        "Specialty Coffee",
        "Diet Meals",
        "وجبات صحية ودايت",
        "بروتين بار وسموزي",
        "قهوة مختصة واسبريسو",
        "مكملات طاقة واستشفاء",
      ],
      priceRange: "$$",
      currenciesAccepted: "EGP",
      paymentAccepted: "Cash, InstaPay, Credit Card, Vodafone Cash",
      address: {
        "@type": "PostalAddress",
        streetAddress: "الطابق الخامس (الروف)، عمارة التوحيد والنور، أول المشاية",
        addressLocality: "السنبلاوين",
        addressRegion: "الدقهلية",
        postalCode: "35661",
        addressCountry: "EG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 30.884098,
        longitude: 31.457378,
      },
      hasMap: "https://www.google.com/maps?q=30.884098,31.457378",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "23:59",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "196",
        bestRating: "5",
        worstRating: "1",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="1znth3vzOYVkqahoEAYDOk6ssDom8tdtFQY3joprldU"
        />
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col no-scrollbar font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
