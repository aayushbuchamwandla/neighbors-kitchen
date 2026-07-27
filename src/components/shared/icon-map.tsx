import {
  Soup,
  Utensils,
  Flame,
  Drumstick,
  Wheat,
  Egg,
  Sandwich,
  Cookie,
  Salad,
  Fish,
  Beef,
  Coffee,
  type LucideIcon,
} from "lucide-react";

export const dishIconMap: Record<string, LucideIcon> = {
  Soup,
  Utensils,
  Flame,
  Drumstick,
  Wheat,
  Egg,
  Sandwich,
  Cookie,
  Salad,
  Fish,
  Beef,
  Coffee,
};

export function getDishIcon(icon: string): LucideIcon {
  return dishIconMap[icon] ?? Utensils;
}
