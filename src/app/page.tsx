import { DemoPreview } from "@/components/demo-preview";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { LeadSection } from "@/components/lead-section";
import { PlatformStory } from "@/components/platform-story";
import { PricingSection } from "@/components/pricing-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PlatformStory />
        <DemoPreview />
        <PricingSection />
        <FaqSection />
        <LeadSection />
      </main>
      <SiteFooter />
    </>
  );
}
