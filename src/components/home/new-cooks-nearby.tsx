import { SectionHeader } from "./section-header";
import { CookCard } from "@/components/shared/cook-card";
import { cooks } from "@/data/cooks";

const newCooks = cooks.filter((cook) => cook.isNewCook);

export function NewCooksNearby() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Just joined"
        title="New Cooks Nearby"
        description="Freshly verified cooks who just opened their kitchen to the neighborhood."
        href="/discover"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {newCooks.map((cook) => (
          <CookCard key={cook.id} cook={cook} />
        ))}
      </div>
    </section>
  );
}
