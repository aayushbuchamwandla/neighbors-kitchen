import { MealCard } from "@/components/shared/meal-card";
import { getCookById } from "@/data/cooks";
import type { Meal } from "@/lib/types";

export function MealScrollRow({ meals }: { meals: Meal[] }) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {meals.map((meal) => {
        const cook = getCookById(meal.cookId);
        return (
          <div key={meal.id} className="w-72 shrink-0 snap-start">
            <MealCard meal={meal} cook={cook} />
          </div>
        );
      })}
    </div>
  );
}
