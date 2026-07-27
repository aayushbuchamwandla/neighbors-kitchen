"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CookAvatar } from "@/components/shared/cook-avatar";
import { cooks } from "@/data/cooks";

const previewCooks = cooks.slice(0, 5);

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(`/discover${params}`);
  }

  return (
    <section className="relative overflow-hidden bg-cream-warm">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Now in the Bay Area
          </span>

          <h1 className="mt-5 text-balance font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Home-cooked meals from people you can actually{" "}
            <span className="text-primary">trust</span>.
          </h1>

          <p className="mt-5 max-w-lg text-balance text-lg text-muted-foreground">
            Skip the ghost kitchens. Reserve real meals made by real neighbors — verified,
            reviewed, and picked up right from their kitchen to yours.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-lg items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-md"
          >
            <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'biryani', 'sourdough', or a neighborhood..."
              className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button type="submit" className="rounded-full px-5">
              Find a Meal
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button render={<Link href="/discover" />} size="lg" className="rounded-full">
              Discover Meals
            </Button>
            <Button render={<Link href="/become-a-cook" />} size="lg" variant="outline" className="rounded-full">
              Become a Cook
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sage" />
              7-point verified cooks
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              4.9 avg. rating
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              25+ neighborhood cooks
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-secondary to-sage-light shadow-xl">
            <div className="absolute inset-6 rounded-[2rem] border border-white/40 bg-white/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex -space-x-3">
                {previewCooks.map((cook) => (
                  <CookAvatar
                    key={cook.id}
                    name={cook.name}
                    theme={cook.avatarColor}
                    className="h-14 w-14 border-4 border-white text-sm"
                  />
                ))}
              </div>
              <p className="font-heading text-lg font-semibold text-charcoal">
                &quot;Would I trust buying dinner from this person?&quot;
              </p>
              <p className="text-sm text-charcoal/70">
                Every cook on Neighbor&apos;s Kitchen answers yes — verified ID, kitchen checks,
                and real reviews from people nearby.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-lg ring-1 ring-border"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light text-sage">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Kitchen Verified</p>
              <p className="text-xs text-muted-foreground">Inspected in person</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
