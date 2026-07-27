import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { getThemeStyle } from "./theme";
import { getDishIcon } from "./icon-map";
import type { CuisineTheme } from "@/lib/types";

interface MealArtProps {
  theme: CuisineTheme;
  icon: string;
  className?: string;
  iconClassName?: string;
}

export function MealArt({ theme, icon, className, iconClassName }: MealArtProps) {
  const style = getThemeStyle(theme);
  const Icon = getDishIcon(icon) ?? Utensils;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        style.gradient,
        className
      )}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-black/10 blur-xl" />
      {/* eslint-disable-next-line react-hooks/static-components -- Icon is looked up from a stable, module-level map keyed by `icon`; same string always resolves to the same component reference. */}
      <Icon
        className={cn("relative text-white/90 drop-shadow-sm", iconClassName ?? "h-10 w-10")}
        strokeWidth={1.5}
      />
    </div>
  );
}
