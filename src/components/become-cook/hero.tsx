import Link from "next/link";
import { Star, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CookAvatar } from "@/components/shared/cook-avatar";
import { cooks } from "@/data/cooks";

const previewCooks = cooks.slice(5, 10);

export function BecomeCookHero() {
  return (
    <section className="relative overflow-hidden bg-cream-warm">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
          Join 25+ neighborhood cooks
        </span>

        <h1 className="mt-5 text-balance font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          Turn your kitchen into a neighborhood favorite.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
          Cook what you love, set your own hours, and get discovered by neighbors who
          actually want what you&apos;re making. No storefront, no delivery hassle — just your
          kitchen and people nearby who trust you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button render={<Link href="#apply" />} size="lg" className="rounded-full px-8">
            Apply to Cook
          </Button>
          <Button render={<Link href="#how-it-works" />} size="lg" variant="outline" className="rounded-full">
            See How It Works
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            {previewCooks.map((cook) => (
              <CookAvatar
                key={cook.id}
                name={cook.name}
                theme={cook.avatarColor}
                className="h-11 w-11 border-4 border-cream-warm text-xs"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              4.9 avg. cook rating
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              10,000+ meals reserved
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sage" />
              Verified &amp; trusted by design
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
