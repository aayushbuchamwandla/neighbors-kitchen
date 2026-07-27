import { Hero } from "@/components/home/hero";
import { NeighborhoodFavorites } from "@/components/home/neighborhood-favorites";
import { TrendingThisWeek } from "@/components/home/trending-this-week";
import { NewCooksNearby } from "@/components/home/new-cooks-nearby";
import { PopularCuisines } from "@/components/home/popular-cuisines";
import { HowItWorks } from "@/components/home/how-it-works";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FeaturedHomeCooks } from "@/components/home/featured-home-cooks";
import { ComingSoon } from "@/components/home/coming-soon";

export default function Home() {
  return (
    <>
      <Hero />
      <NeighborhoodFavorites />
      <TrendingThisWeek />
      <NewCooksNearby />
      <PopularCuisines />
      <HowItWorks />
      <FeaturedHomeCooks />
      <TestimonialsSection />
      <ComingSoon />
    </>
  );
}
