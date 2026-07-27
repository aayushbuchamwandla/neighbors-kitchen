import { SectionHeader } from "./section-header";
import { MealScrollRow } from "./meal-scroll-row";
import { meals } from "@/data/meals";

const favorites = [...meals].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 12);

export function NeighborhoodFavorites() {
  return (
    <section id="neighborhood-favorites" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Loved nearby"
        title="Neighborhood Favorites"
        description="The dishes your neighbors keep reordering, week after week."
        href="/discover"
      />
      <MealScrollRow meals={favorites} />
    </section>
  );
}
