import type { Metadata } from "next";
import { BecomeCookHero } from "@/components/become-cook/hero";
import { Benefits } from "@/components/become-cook/benefits";
import { OnboardingTimeline } from "@/components/become-cook/onboarding-timeline";
import { BecomeCookCta } from "@/components/become-cook/cta";

export const metadata: Metadata = {
  title: "Become a Cook — Neighbor's Kitchen",
  description: "Turn your kitchen into a neighborhood favorite. Apply to cook on Neighbor's Kitchen.",
};

export default function BecomeACookPage() {
  return (
    <div>
      <BecomeCookHero />
      <Benefits />
      <OnboardingTimeline />
      <BecomeCookCta />
    </div>
  );
}
