import Hero from "@/components/home/hero";
import ServicesSection from "@/components/home/services-section";
import TechStackSection from "@/components/home/tech-stack-section";
import CtaSection from "@/components/home/cta-section";
import ReferencesSection from "@/components/home/references-section";
import ProcessSection from "@/components/home/process-section";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="container px-4 md:px-6 space-y-24 md:space-y-32 py-24 md:py-32">
        <ServicesSection />
        <ProcessSection />
        <ReferencesSection />
        <TechStackSection />
        <CtaSection />
      </div>
    </div>
  );
}
