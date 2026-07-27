"use client";

import { Flame, Clock3 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cuisines } from "@/data/cuisines";
import { cn } from "@/lib/utils";
import type { DietaryTag } from "@/lib/types";

export interface DiscoverFilterState {
  cuisines: string[];
  dietary: DietaryTag[];
  spicyOnly: boolean;
  todayOnly: boolean;
  minRating: number;
  priceTier: "any" | "under12" | "12to18" | "over18";
}

export const defaultFilters: DiscoverFilterState = {
  cuisines: [],
  dietary: [],
  spicyOnly: false,
  todayOnly: false,
  minRating: 0,
  priceTier: "any",
};

const dietaryOptions: { value: DietaryTag; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
];

const priceTiers: { value: DiscoverFilterState["priceTier"]; label: string }[] = [
  { value: "any", label: "Any price" },
  { value: "under12", label: "Under $12" },
  { value: "12to18", label: "$12 – $18" },
  { value: "over18", label: "$18+" },
];

const ratingOptions = [0, 4, 4.5, 4.8];

interface DiscoverFiltersProps {
  filters: DiscoverFilterState;
  onChange: (filters: DiscoverFilterState) => void;
  resultCount: number;
}

export function DiscoverFilters({ filters, onChange, resultCount }: DiscoverFiltersProps) {
  function toggleCuisine(name: string) {
    const next = filters.cuisines.includes(name)
      ? filters.cuisines.filter((c) => c !== name)
      : [...filters.cuisines, name];
    onChange({ ...filters, cuisines: next });
  }

  function toggleDietary(tag: DietaryTag) {
    const next = filters.dietary.includes(tag)
      ? filters.dietary.filter((d) => d !== tag)
      : [...filters.dietary, tag];
    onChange({ ...filters, dietary: next });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-heading text-base font-semibold text-foreground">Filters</p>
        <Button variant="ghost" size="sm" onClick={() => onChange(defaultFilters)} className="text-xs">
          Reset
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{resultCount} meals match your filters</p>

      <div>
        <p className="mb-2.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          Pickup
        </p>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={filters.todayOnly}
            onCheckedChange={(checked) => onChange({ ...filters, todayOnly: checked === true })}
          />
          <span className="text-sm text-foreground">Available today</span>
        </label>
      </div>

      <Separator />

      <div>
        <p className="mb-2.5 text-sm font-medium text-foreground">Cuisine</p>
        <div className="flex max-h-52 flex-col gap-2 overflow-y-auto pr-1">
          {cuisines.map((cuisine) => (
            <Label key={cuisine.name} className="flex items-center gap-2 font-normal">
              <Checkbox
                checked={filters.cuisines.includes(cuisine.name)}
                onCheckedChange={() => toggleCuisine(cuisine.name)}
              />
              <span className="text-sm text-foreground">{cuisine.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{cuisine.mealCount}</span>
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="mb-2.5 text-sm font-medium text-foreground">Dietary</p>
        <div className="flex flex-col gap-2">
          {dietaryOptions.map((option) => (
            <Label key={option.value} className="flex items-center gap-2 font-normal">
              <Checkbox
                checked={filters.dietary.includes(option.value)}
                onCheckedChange={() => toggleDietary(option.value)}
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </Label>
          ))}
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox
              checked={filters.spicyOnly}
              onCheckedChange={(checked) => onChange({ ...filters, spicyOnly: checked === true })}
            />
            <span className="flex items-center gap-1 text-sm text-foreground">
              <Flame className="h-3.5 w-3.5 text-primary" />
              Spicy
            </span>
          </Label>
        </div>
      </div>

      <Separator />

      <div>
        <p className="mb-2.5 text-sm font-medium text-foreground">Price</p>
        <div className="flex flex-wrap gap-2">
          {priceTiers.map((tier) => (
            <button
              key={tier.value}
              onClick={() => onChange({ ...filters, priceTier: tier.value })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filters.priceTier === tier.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="mb-2.5 text-sm font-medium text-foreground">Minimum rating</p>
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, minRating: rating })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filters.minRating === rating
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              {rating === 0 ? "Any" : `${rating}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
