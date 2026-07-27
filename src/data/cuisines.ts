import type { CuisineInfo } from "@/lib/types";
import { meals } from "./meals";

const cuisineIcons: Record<string, string> = {
  Indian: "Soup",
  Italian: "Utensils",
  Mexican: "Flame",
  Korean: "Drumstick",
  Vietnamese: "Soup",
  Japanese: "Egg",
  American: "Sandwich",
  French: "Cookie",
  Nigerian: "Flame",
  Mediterranean: "Salad",
  Thai: "Soup",
  Chinese: "Utensils",
  Ethiopian: "Soup",
  Filipino: "Utensils",
  Greek: "Salad",
};

const cuisineOrder = [
  "Indian",
  "Italian",
  "Mexican",
  "Korean",
  "Vietnamese",
  "Japanese",
  "American",
  "French",
  "Nigerian",
  "Mediterranean",
  "Thai",
  "Chinese",
  "Ethiopian",
  "Filipino",
  "Greek",
] as const;

export const cuisines: CuisineInfo[] = cuisineOrder.map((name) => ({
  name,
  icon: cuisineIcons[name],
  mealCount: meals.filter((meal) => meal.cuisine === name).length,
}));
