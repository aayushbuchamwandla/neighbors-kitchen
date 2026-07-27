"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, SearchX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/shared/meal-card";
import { DiscoverFilters, defaultFilters, type DiscoverFilterState } from "./discover-filters";
import { meals } from "@/data/meals";
import { getCookById } from "@/data/cooks";
import type { Meal } from "@/lib/types";

type SortKey = "rating" | "priceLow" | "priceHigh" | "reviews";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "priceLow", label: "Price: low to high" },
  { value: "priceHigh", label: "Price: high to low" },
];

function matchesPriceTier(price: number, tier: DiscoverFilterState["priceTier"]) {
  if (tier === "under12") return price < 12;
  if (tier === "12to18") return price >= 12 && price <= 18;
  if (tier === "over18") return price > 18;
  return true;
}

export function DiscoverClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<DiscoverFilterState>(defaultFilters);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("rating");

  const searchParamsKey = searchParams.toString();
  const [syncedParamsKey, setSyncedParamsKey] = useState(searchParamsKey);
  if (searchParamsKey !== syncedParamsKey) {
    setSyncedParamsKey(searchParamsKey);
    const q = searchParams.get("q");
    const cuisine = searchParams.get("cuisine");
    if (q) setQuery(q);
    if (cuisine) setFilters((prev) => ({ ...prev, cuisines: [cuisine] }));
  }

  const results = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    const filtered = meals.filter((meal) => {
      const cook = getCookById(meal.cookId);

      if (lowerQuery) {
        const haystack = `${meal.name} ${meal.shortDescription} ${meal.cuisine} ${cook?.name ?? ""}`.toLowerCase();
        if (!haystack.includes(lowerQuery)) return false;
      }

      if (filters.cuisines.length > 0 && !filters.cuisines.includes(meal.cuisine)) return false;
      if (filters.dietary.length > 0 && !filters.dietary.every((tag) => meal.dietary.includes(tag))) return false;
      if (filters.spicyOnly && !meal.tags.includes("Spicy")) return false;
      if (filters.todayOnly && meal.pickupDay !== "Today") return false;
      if (filters.minRating > 0 && meal.rating < filters.minRating) return false;
      if (!matchesPriceTier(meal.price, filters.priceTier)) return false;

      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return b.rating - a.rating;
    });

    return sorted;
  }, [filters, query, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">Discover Meals</h1>
          <p className="mt-1 text-muted-foreground">
            {query ? `Results for "${query}"` : "Home-cooked meals from verified cooks near you."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              }
            />
            <SheetContent side="left" className="w-full overflow-y-auto p-5 sm:max-w-xs">
              <SheetHeader className="p-0">
                <SheetTitle>Filter meals</SheetTitle>
              </SheetHeader>
              <DiscoverFilters filters={filters} onChange={setFilters} resultCount={results.length} />
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortKey)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
            <DiscoverFilters filters={filters} onChange={setFilters} resultCount={results.length} />
          </div>
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground" />
              <p className="font-heading text-lg font-semibold text-foreground">No meals match those filters</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try widening your search — remove a filter or two and your neighborhood cooks will show back up.
              </p>
              <Button variant="outline" onClick={() => setFilters(defaultFilters)}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
              {results.map((meal: Meal) => (
                <MealCard key={meal.id} meal={meal} cook={getCookById(meal.cookId)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
