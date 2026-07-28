import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { photoCredits, getCommonsUrl } from "@/data/photo-credits";
import { getMealById } from "@/data/meals";

export const metadata: Metadata = {
  title: "Photo Credits — Neighbor's Kitchen",
  description: "Sourcing and attribution for every meal photo on Neighbor's Kitchen.",
};

export default function PhotoCreditsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">Photo Credits</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every meal photo on Neighbor&apos;s Kitchen is a real, unedited photograph — not AI-generated or
        AI-touched — sourced from Wikimedia Commons under its contributors&apos; open licenses (CC BY-SA,
        CC BY, or public domain). Cook portraits are intentionally illustrative initials, not photos of
        real people, since the cooks in this prototype are fictional. The list below links each meal to
        its exact source file and license on Commons.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {photoCredits.map((credit) => {
          const meal = getMealById(credit.mealId);
          return (
            <a
              key={credit.mealId}
              href={getCommonsUrl(credit.filename)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:border-primary/40"
            >
              <span className="truncate text-foreground">{meal?.name ?? credit.mealId}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </a>
          );
        })}
      </div>

      <Link href="/" className="mt-10 inline-block text-sm font-medium text-primary hover:underline">
        Back to Neighbor&apos;s Kitchen
      </Link>
    </div>
  );
}
