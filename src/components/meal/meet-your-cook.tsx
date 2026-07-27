import Link from "next/link";
import { ArrowRight, Star, Clock, Repeat2, Utensils, Languages } from "lucide-react";
import { CookAvatar } from "@/components/shared/cook-avatar";
import { VerificationBadgeList } from "@/components/shared/verification-badges";
import type { Cook } from "@/lib/types";

export function MeetYourCook({ cook }: { cook: Cook }) {
  const stats = [
    { icon: Star, label: "Rating", value: `${cook.rating} (${cook.reviewCount})` },
    { icon: Clock, label: "Response time", value: cook.responseTime.replace("Usually responds within ", "") },
    { icon: Repeat2, label: "Repeat customers", value: `${cook.repeatCustomerPct}%` },
    { icon: Utensils, label: "Meals sold", value: `${cook.mealsSold}+` },
  ];

  return (
    <section className="rounded-3xl border border-border bg-cream-warm p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Meet Your Cook</p>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
        <CookAvatar name={cook.name} theme={cook.avatarColor} className="h-20 w-20 shrink-0 text-2xl" />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-xl font-semibold text-foreground">{cook.name}</h3>
            <span className="text-sm text-muted-foreground">
              {cook.neighborhood}, {cook.city}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">{cook.tagline}</p>
          <p className="mt-3 text-sm text-muted-foreground">{cook.bio}</p>
          <blockquote className="mt-3 border-l-2 border-primary/40 pl-3 text-sm italic text-foreground/80">
            {cook.story}
          </blockquote>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            Speaks {cook.languages.join(", ")}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-card p-3 text-center ring-1 ring-border">
                <stat.icon className="mx-auto h-4 w-4 text-primary" />
                <p className="mt-1 font-heading text-sm font-semibold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <VerificationBadgeList verification={cook.verification} variant="compact" className="mt-5" />

          <Link
            href={`/cook/${cook.slug}`}
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View {cook.name.split(" ")[0]}&apos;s full profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
