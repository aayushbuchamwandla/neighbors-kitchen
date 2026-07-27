"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CookAvatar } from "./cook-avatar";
import { RatingStars } from "./rating-stars";
import { VerificationBadgeList } from "./verification-badges";
import { cn } from "@/lib/utils";
import type { Cook } from "@/lib/types";

interface CookCardProps {
  cook: Cook;
  className?: string;
}

export function CookCard({ cook, className }: CookCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <Link href={`/cook/${cook.slug}`} className="block h-full">
        <Card className={cn("h-full gap-3 p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg", className)}>
          <div className="flex items-start gap-3">
            <CookAvatar name={cook.name} theme={cook.avatarColor} className="h-14 w-14 text-base" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-heading text-base font-semibold text-foreground">{cook.name}</h3>
                {cook.isNewCook && (
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">
                    New
                  </span>
                )}
                {cook.isTrending && !cook.isNewCook && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    Trending
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">{cook.cuisines.join(" · ")}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <RatingStars rating={cook.rating} reviewCount={cook.reviewCount} />
                <span className="flex items-center gap-0.5">
                  <MapPin className="h-3 w-3" />
                  {cook.distanceMiles} mi
                </span>
              </div>
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">{cook.tagline}</p>

          <VerificationBadgeList verification={cook.verification} variant="compact" className="mt-1" />

          <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-sm font-medium text-primary">
            <span>View Menu</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
