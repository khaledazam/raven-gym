import React from "react";

export function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.903 2.879 2.896 2.896 0 0 1-2.892-2.879 2.896 2.896 0 0 1 2.892-2.88c.328 0 .64.053.93.151v-3.52a6.34 6.34 0 0 0-.93-.07 6.335 6.335 0 0 0-6.338 6.32 6.335 6.335 0 0 0 6.338 6.319 6.335 6.335 0 0 0 6.338-6.319V8.625c1.196.85 2.656 1.353 4.238 1.396V6.697l-.428-.011z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export interface SocialLinkItem {
  id: "instagram" | "tiktok" | "facebook";
  name: string;
  nameAr: string;
  handle: string;
  url: string;
  description: string;
  badge: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    nameAr: "إنستغرام",
    handle: "@raven_gym1",
    url: "https://instagram.com/raven_gym1?utm_source=qr",
    description: "الحساب الرسمي، التمارين، ويوميات الجيم",
    badge: "",
  },
  {
    id: "tiktok",
    name: "TikTok",
    nameAr: "تيك توك",
    handle: "@raven.gym",
    url: "https://www.tiktok.com/@raven.gym?_r=1&_t=ZS-9AW8AIuBQ52",
    description: "الحساب الرسمي، فيديوهات التدريب وحماس الأبطال",
    badge: "",
  },
  {
    id: "facebook",
    name: "Facebook",
    nameAr: "فيسبوك",
    handle: "Raven Gym",
    url: "https://www.facebook.com/share/1C15kFpH3U/?mibextid=wwXIfr",
    description: "الصفحة الرسمية، آخر العروض والاشتراكات",
    badge: "الصفحة الرسمية",
  },
];
