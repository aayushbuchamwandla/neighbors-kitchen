import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, Flame, Star, TriangleAlert, Users } from "lucide-react";
import { MealArt } from "@/components/shared/meal-art";
import { RatingStars } from "@/components/shared/rating-stars";
import { CookAvatar } from "@/components/shared/cook-avatar";
import { MealCard } from "@/components/shared/meal-card";
import { ReserveModal } from "@/components/meal/reserve-modal";
import { MeetYourCook } from "@/components/meal/meet-your-cook";
import { getMealById, getMealsByCook, meals } from "@/data/meals";
import { getCookById } from "@/data/cooks";
import { reviews } from "@/data/reviews";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return meals.map((meal) => ({ id: meal.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meal = getMealById(id);
  if (!meal) return {};
  return {
    title: `${meal.name} — Neighbor's Kitchen`,
    description: meal.shortDescription,
  };
}

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = getMealById(id);
  if (!meal) notFound();

  const cook = getCookById(meal.cookId);
  if (!cook) notFound();

  const mealReviews = reviews.filter((r) => r.mealId === meal.id);
  const moreFromCook = getMealsByCook(cook.id).filter((m) => m.id !== meal.id).slice(0, 4);
  const lowStock = meal.portionsRemaining <= Math.max(3, Math.round(meal.totalPortions * 0.15));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/discover"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Discover
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="sticky top-24">
            <MealArt
              theme={meal.colorTheme}
              icon={meal.icon}
              className="aspect-square w-full rounded-3xl shadow-md"
              iconClassName="h-24 w-24"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {meal.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              {meal.dietary.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{meal.cuisine}</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {meal.name}
          </h1>

          <Link href={`/cook/${cook.slug}`} className="mt-3 flex items-center gap-2 text-sm">
            <CookAvatar name={cook.name} theme={cook.avatarColor} className="h-8 w-8 text-xs" />
            <span className="font-medium text-foreground">{cook.name}</span>
            <span className="text-muted-foreground">
              · {cook.neighborhood}, {cook.city}
            </span>
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <RatingStars rating={meal.rating} reviewCount={meal.reviewCount} size="md" />
            <span className="font-heading text-2xl font-semibold text-foreground">${meal.price}</span>
          </div>

          <p className="mt-4 text-muted-foreground">{meal.description}</p>

          {meal.story && (
            <blockquote className="mt-4 border-l-2 border-primary/40 pl-3 text-sm italic text-foreground/80">
              {meal.story}
            </blockquote>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium text-foreground">{meal.pickupDay}</p>
                <p className="text-xs text-muted-foreground">{meal.pickupWindow}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className={lowStock ? "font-medium text-destructive" : "font-medium text-foreground"}>
                  {meal.portionsRemaining} of {meal.totalPortions} left
                </p>
                <p className="text-xs text-muted-foreground">Portions remaining</p>
              </div>
            </div>
            {meal.tags.includes("Spicy") && (
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
                <Flame className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Spicy</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <ReserveModal meal={meal} cook={cook} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">Ingredients</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1.5 font-heading text-base font-semibold text-foreground">
                Allergens
              </h3>
              {meal.allergens.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {meal.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium capitalize text-destructive"
                    >
                      <TriangleAlert className="h-3 w-3" />
                      {allergen}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">No common allergens listed.</p>
              )}

              {meal.nutrition && (
                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: "Cal", value: meal.nutrition.calories },
                    { label: "Protein", value: `${meal.nutrition.protein}g` },
                    { label: "Carbs", value: `${meal.nutrition.carbs}g` },
                    { label: "Fat", value: `${meal.nutrition.fat}g` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-muted/50 py-2">
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      <p className="text-[11px] text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <MeetYourCook cook={cook} />
      </div>

      {mealReviews.length > 0 && (
        <div className="mt-14">
          <h2 className="font-heading text-2xl font-semibold text-foreground">What people are saying</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mealReviews.map((review) => (
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

      {moreFromCook.length > 0 && (
        <div className="mt-14">
          <h2 className="font-heading text-2xl font-semibold text-foreground">More from {cook.name}</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {moreFromCook.map((relatedMeal) => (
              <MealCard key={relatedMeal.id} meal={relatedMeal} cook={cook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
