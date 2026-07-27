import { Search, ShoppingBag, MapPin, Smile } from "lucide-react";
import { SectionHeader } from "./section-header";

const steps = [
  {
    icon: Search,
    title: "Browse verified cooks nearby",
    description: "Explore real home cooks in your neighborhood, each with a full trust profile and honest reviews.",
  },
  {
    icon: ShoppingBag,
    title: "Reserve your meal",
    description: "Pick a dish, choose your pickup window, and reserve in a couple of taps — no account required to browse.",
  },
  {
    icon: MapPin,
    title: "Pick it up nearby",
    description: "Swing by the cook's neighborhood pickup spot at your reserved time. No delivery fees, no cold food.",
  },
  {
    icon: Smile,
    title: "Enjoy & leave a review",
    description: "Taste a meal made with care, then help your neighbors discover it too.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream-warm py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Simple by design" title="How It Works" description="Four steps between you and a meal made by someone who actually cares." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="absolute right-5 top-5 font-heading text-3xl font-semibold text-primary/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
