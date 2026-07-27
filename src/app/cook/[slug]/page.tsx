import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Star, Clock, Repeat2, Utensils, Languages, Flame } from "lucide-react";
import { CookAvatar } from "@/components/shared/cook-avatar";
import { RatingStars } from "@/components/shared/rating-stars";
import { VerificationBadgeList } from "@/components/shared/verification-badges";
import { MealCard } from "@/components/shared/meal-card";
import { cooks, getCookBySlug } from "@/data/cooks";
import { getMealsByCook } from "@/data/meals";
import { reviews } from "@/data/reviews";

export function generateStaticParams() {
  return cooks.map((cook) => ({ slug: cook.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cook = getCookBySlug(slug);
  if (!cook) return {};
  return {
    title: `${cook.name} — Neighbor's Kitchen`,
    description: cook.tagline,
  };
}

export default async function CookProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cook = getCookBySlug(slug);
  if (!cook) notFound();

  const cookMeals = getMealsByCook(cook.id);
  const cookReviews = reviews.filter((r) => r.cookId === cook.id);

  const stats = [
    { icon: Star, label: "Rating", value: `${cook.rating}` },
    { icon: Clock, label: "Response", value: cook.responseTime.replace("Usually responds within ", "") },
    { icon: Repeat2, label: "Repeat customers", value: `${cook.repeatCustomerPct}%` },
    { icon: Utensils, label: "Meals sold", value: `${cook.mealsSold}+` },
    { icon: Flame, label: "Years cooking", value: `${cook.yearsCooking}` },
  ];

  return (
    <div>
      <section className="bg-cream-warm">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/discover"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Discover
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <CookAvatar name={cook.name} theme={cook.avatarColor} className="h-24 w-24 shrink-0 text-3xl" />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">{cook.name}</h1>
                {cook.isNewCook && (
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                    New Cook
                  </span>
                )}
                {cook.isTrending && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    Trending
                  </span>
                )}
              </div>
              <p className="mt-1 text-lg font-medium text-primary">{cook.tagline}</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <RatingStars rating={cook.rating} reviewCount={cook.reviewCount} size="md" />
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {cook.neighborhood}, {cook.city} · {cook.distanceMiles} mi
                </span>
                <span>{cook.cuisines.join(" · ")}</span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">{cook.joinedLabel}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-card p-4 text-center ring-1 ring-border">
                <stat.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1.5 font-heading text-base font-semibold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-xl font-semibold text-foreground">About {cook.name.split(" ")[0]}</h2>
            <p className="mt-3 text-muted-foreground">{cook.bio}</p>
            <blockquote className="mt-4 border-l-2 border-primary/40 pl-4 italic text-foreground/80">
              {cook.story}
            </blockquote>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Languages className="h-4 w-4" />
                Speaks {cook.languages.join(", ")}
              </span>
              <span className="flex items-center gap-1.5">
                <Utensils className="h-4 w-4" />
                Favorite dish to make: {cook.favoriteDish}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">Trust &amp; Verification</h2>
            <VerificationBadgeList verification={cook.verification} className="mt-4" />
          </div>
        </div>

        {cookReviews.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-semibold text-foreground">Customer Reviews</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cookReviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{review.authorName}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {cook.name.split(" ")[0]}&apos;s Menu
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cookMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} cook={cook} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
