"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Clock, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RatingStars } from "./rating-stars";
import { cn } from "@/lib/utils";
import { getMealImagePath } from "@/data/meals";
import type { Cook, Meal } from "@/lib/types";

interface MealCardProps {
  meal: Meal;
  cook?: Cook;
  className?: string;
}

export function MealCard({ meal, cook, className }: MealCardProps) {
  const [favorited, setFavorited] = useState(false);
  const lowStock = meal.portionsRemaining <= Math.max(3, Math.round(meal.totalPortions * 0.15));

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("relative", className)}
    >
      <Card className="group relative gap-0 overflow-hidden [--card-spacing:0px] shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setFavorited((v) => !v);
          }}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorited}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-sm backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={cn("h-4 w-4 transition-colors", favorited && "fill-primary text-primary")} />
        </button>

        {lowStock && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            Only {meal.portionsRemaining} left
          </span>
        )}

        <div className="relative h-44 w-full">
          <Image
            src={getMealImagePath(meal)}
            alt={meal.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          {cook && (
            <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {cook.name} · {cook.neighborhood}
            </p>
          )}
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
            {meal.name}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{meal.shortDescription}</p>

          <div className="mt-1 flex items-center justify-between">
            <RatingStars rating={meal.rating} reviewCount={meal.reviewCount} />
            <span className="font-heading text-base font-semibold text-foreground">${meal.price}</span>
          </div>

          <div className="flex items-center gap-3 border-t border-border pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {meal.pickupDay}, {meal.pickupWindow}
            </span>
            {meal.tags.includes("Spicy") && (
              <span className="flex items-center gap-1 text-primary">
                <Flame className="h-3.5 w-3.5" />
                Spicy
              </span>
            )}
          </div>
        </div>

        <Link href={`/meal/${meal.id}`} className="absolute inset-0 z-10" aria-label={`View ${meal.name}`}>
          <span className="sr-only">View {meal.name}</span>
        </Link>
      </Card>
    </motion.div>
  );
}
