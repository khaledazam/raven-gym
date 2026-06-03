import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Transformations from "@/components/sections/Transformations";
import AiNutrition from "@/components/sections/AiNutrition";
import Memberships from "@/components/sections/Memberships";
import Finale from "@/components/sections/Finale";
import RavenCoachBot from "@/components/sections/RavenCoachBot";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black">
      <Hero />
      <About />
      <Transformations />
      <AiNutrition />
      <Memberships />
      <Finale />
      <RavenCoachBot />
    </main>
  );
}

