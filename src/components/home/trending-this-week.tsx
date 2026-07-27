import { SectionHeader } from "./section-header";
import { MealScrollRow } from "./meal-scroll-row";
import { meals } from "@/data/meals";
import { getCookById } from "@/data/cooks";

const trending = meals
  .filter((meal) => meal.tags.includes("Bestseller") || getCookById(meal.cookId)?.isTrending)
  .slice(0, 12);

export function TrendingThisWeek() {
  return (
    <section className="bg-cream-warm py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Hot right now"
          title="Trending This Week"
          description="What the neighborhood can't stop ordering right now."
          href="/discover"
        />
        <MealScrollRow meals={trending} />
      </div>
    </section>
  );
}
