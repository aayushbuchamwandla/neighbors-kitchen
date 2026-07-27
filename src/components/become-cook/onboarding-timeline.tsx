import { FileText, ShieldCheck, Store, Megaphone, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply & tell us about your kitchen",
    description: "Share your story, your cuisine, and what makes your cooking worth trying. Takes about five minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Get verified",
    description: "We confirm your ID, food handler certification, and run a background check. A team member verifies your kitchen in person.",
  },
  {
    icon: Store,
    title: "Set up your menu & pricing",
    description: "Add your first dishes with photos, ingredients, and pickup windows. You set every price.",
  },
  {
    icon: Megaphone,
    title: "Get discovered by neighbors",
    description: "Your profile goes live on Discover, sorted by cuisine, neighborhood, and what's trending nearby.",
  },
  {
    icon: Sparkles,
    title: "Start cooking & earning",
    description: "Accept reservations, prep for pickup windows, and start building a loyal neighborhood following.",
  },
];

export function OnboardingTimeline() {
  return (
    <section id="how-it-works" className="bg-cream-warm py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Getting started</p>
          <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Five steps from application to your first order
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex gap-5">
              {i < steps.length - 1 && (
                <span className="absolute left-6 top-14 h-[calc(100%-1.5rem)] w-px bg-border" />
              )}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <step.icon className="h-5 w-5" />
              </span>
              <div className="pb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step {i + 1}</p>
                <h3 className="mt-0.5 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
