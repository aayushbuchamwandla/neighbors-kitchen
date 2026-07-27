import { Suspense } from "react";
import type { Metadata } from "next";
import { DiscoverClient } from "@/components/discover/discover-client";

export const metadata: Metadata = {
  title: "Discover Meals — Neighbor's Kitchen",
  description: "Browse home-cooked meals from verified cooks in your neighborhood.",
};

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">Loading meals...</div>}>
      <DiscoverClient />
    </Suspense>
  );
}
