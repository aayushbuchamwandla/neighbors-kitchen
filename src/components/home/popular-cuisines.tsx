import Link from "next/link";
import { SectionHeader } from "./section-header";
import { getDishIcon } from "@/components/shared/icon-map";
import { cuisines } from "@/data/cuisines";

const tileThemes = [
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-lime-100 text-lime-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

export function PopularCuisines() {
  return (
    <section id="cuisines" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Explore by craving" title="Popular Cuisines" href="/discover" />
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8">
        {cuisines.map((cuisine, i) => {
          const Icon = getDishIcon(cuisine.icon);
          return (
            <Link
              key={cuisine.name}
              href={`/discover?cuisine=${encodeURIComponent(cuisine.name)}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${tileThemes[i % tileThemes.length]}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-foreground">{cuisine.name}</span>
              <span className="text-xs text-muted-foreground">{cuisine.mealCount} dishes</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
