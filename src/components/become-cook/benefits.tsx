import { DollarSign, Percent, Megaphone, Calendar, ShieldCheck, Heart } from "lucide-react";

const benefits = [
  {
    icon: Percent,
    title: "Keep 85% of every order",
    description: "The lowest take rate in the category — we take a small fee to run verification, not to compete with your margins.",
  },
  {
    icon: Calendar,
    title: "Cook on your own schedule",
    description: "List a handful of meals a week or run a full weekly menu. You decide how much of your kitchen you share.",
  },
  {
    icon: Megaphone,
    title: "We handle discovery",
    description: "Neighbors searching for your cuisine, your neighborhood, or your specialty find you automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Trust badges do the selling",
    description: "Verification badges build customer confidence before they even read your menu — so you don't have to.",
  },
  {
    icon: DollarSign,
    title: "Get paid fast",
    description: "Reservations are paid up front. Funds are available as soon as pickup is confirmed.",
  },
  {
    icon: Heart,
    title: "Join a community of cooks",
    description: "Connect with other home cooks on the platform — swap tips, cross-promote, and grow together.",
  },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Why cook with us</p>
        <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built for cooks, not ghost kitchens
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <benefit.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
