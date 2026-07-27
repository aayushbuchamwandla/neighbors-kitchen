import type { CuisineTheme } from "@/lib/types";

interface ThemeStyle {
  gradient: string;
  ring: string;
  text: string;
}

export const themeStyles: Record<CuisineTheme, ThemeStyle> = {
  saffron: { gradient: "from-amber-300 via-amber-400 to-orange-500", ring: "ring-amber-500/20", text: "text-amber-700" },
  tomato: { gradient: "from-red-400 via-rose-500 to-rose-600", ring: "ring-rose-500/20", text: "text-rose-700" },
  lime: { gradient: "from-lime-300 via-lime-400 to-green-600", ring: "ring-green-500/20", text: "text-green-700" },
  chili: { gradient: "from-orange-400 via-orange-500 to-red-600", ring: "ring-red-500/20", text: "text-red-700" },
  matcha: { gradient: "from-emerald-300 via-emerald-400 to-teal-600", ring: "ring-teal-500/20", text: "text-teal-700" },
  plum: { gradient: "from-purple-300 via-purple-400 to-fuchsia-600", ring: "ring-fuchsia-500/20", text: "text-fuchsia-700" },
  butter: { gradient: "from-yellow-200 via-yellow-300 to-amber-500", ring: "ring-amber-500/20", text: "text-amber-700" },
  cocoa: { gradient: "from-amber-600 via-amber-700 to-stone-800", ring: "ring-stone-500/20", text: "text-stone-700" },
  citrus: { gradient: "from-yellow-300 via-lime-400 to-lime-500", ring: "ring-lime-500/20", text: "text-lime-700" },
  berry: { gradient: "from-pink-300 via-pink-400 to-rose-600", ring: "ring-pink-500/20", text: "text-pink-700" },
};

export function getThemeStyle(theme: string): ThemeStyle {
  return themeStyles[theme as CuisineTheme] ?? themeStyles.saffron;
}
