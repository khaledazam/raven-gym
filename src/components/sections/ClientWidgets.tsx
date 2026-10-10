"use client";

import dynamic from "next/dynamic";

const RavenCoachBot = dynamic(() => import("./RavenCoachBot"), {
  ssr: false,
});

export default function ClientWidgets() {
  return <RavenCoachBot />;
}
