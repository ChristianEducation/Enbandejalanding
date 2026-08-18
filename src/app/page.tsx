import { DemoPreview } from "@/components/demo-preview";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { LeadSection } from "@/components/lead-section";
import { MulticolegioSection } from "@/components/multicolegio-section";
import { PlatformStory } from "@/components/platform-story";
import { PricingSection } from "@/components/pricing-section";
import { ProblemSection } from "@/components/problem-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsIncluded } from "@/components/whats-included";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <PlatformStory />
        <WhatsIncluded />
        <DemoPreview />
        <PricingSection />
        <MulticolegioSection />
        <FaqSection />
        <LeadSection />
      </main>
      <SiteFooter />
    </>
  );
}
