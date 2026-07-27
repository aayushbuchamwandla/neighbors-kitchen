import Link from "next/link";
import { ChefHat, Camera, MessageCircle, Globe, MapPin } from "lucide-react";

const exploreLinks = [
  { href: "/discover", label: "Discover Meals" },
  { href: "/#neighborhood-favorites", label: "Neighborhood Favorites" },
  { href: "/#cuisines", label: "Browse by Cuisine" },
  { href: "/become-a-cook", label: "Become a Cook" },
];

const trustLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#verification", label: "Our Verification System" },
  { href: "/#testimonials", label: "Customer Stories" },
];

const cities = ["San Francisco", "Oakland", "Berkeley", "Daly City", "Fremont", "San Jose"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream-warm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ChefHat className="h-4 w-4" />
              </span>
              <span className="font-heading text-base font-semibold text-foreground">
                Neighbor&apos;s Kitchen
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Home-cooked meals from verified cooks down the street. Trust first. Pickup only, for now.
            </p>
            <div className="mt-4 flex items-center gap-3 text-muted-foreground">
              <Camera className="h-4 w-4" />
              <MessageCircle className="h-4 w-4" />
              <Globe className="h-4 w-4" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Explore</p>
            <ul className="mt-3 space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Trust &amp; Safety</p>
            <ul className="mt-3 space-y-2">
              {trustLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Serving</p>
            <ul className="mt-3 space-y-2">
              {cities.map((city) => (
                <li key={city} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Neighbor&apos;s Kitchen. Pickup only — delivery is on our roadmap.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Trust &amp; Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
