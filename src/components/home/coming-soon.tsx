import { Repeat, Truck, Users, Briefcase, ChartColumn, CalendarDays, Gift } from "lucide-react";
import { SectionHeader } from "./section-header";

const roadmapItems = [
  { icon: Repeat, title: "Meal Subscriptions", description: "Weekly plans from your favorite cooks, delivered to your reservation queue automatically." },
  { icon: Truck, title: "Delivery", description: "Optional delivery for when pickup isn't possible — trust stays the priority, convenience comes second." },
  { icon: Users, title: "Group Orders", description: "Coordinate a shared order with neighbors and split pickup for block parties or potlucks." },
  { icon: Briefcase, title: "Office Catering", description: "Bring real home-cooked meals to your team, sourced from local kitchens instead of chains." },
  { icon: ChartColumn, title: "Cook Analytics", description: "Dashboards for cooks to track demand, repeat customers, and their most-loved dishes." },
  { icon: CalendarDays, title: "Community Events", description: "Pop-up tastings and neighborhood dinners hosted by cooks on the platform." },
  { icon: Gift, title: "Loyalty Rewards", description: "Earn perks for reordering from the cooks and cuisines you love most." },
];

export function ComingSoon() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What's next"
        title="Coming Soon"
        description="Trust comes first. Once that's earned, here's where Neighbor's Kitchen goes next."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roadmapItems.map((item) => (
          <div
            key={item.title}
            className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-muted/40 p-5"
          >
            <span className="absolute right-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">
              Coming soon
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <item.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-heading text-base font-semibold text-foreground/80">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
