import { SectionHeader } from "./section-header";
import { CookCard } from "@/components/shared/cook-card";
import { cooks } from "@/data/cooks";

const featured = [...cooks].sort((a, b) => b.mealsSold - a.mealsSold).slice(0, 8);

export function FeaturedHomeCooks() {
  return (
    <section className="bg-cream-warm py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Meet the neighborhood"
          title="Featured Home Cooks"
          description="The people behind the meals — their stories, their kitchens, their names."
          href="/discover"
          linkLabel="See all cooks"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cook) => (
            <CookCard key={cook.id} cook={cook} />
          ))}
        </div>
      </div>
    </section>
  );
}
