"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Menu, X, User, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/become-a-cook", label: "Become a Cook" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setMobileOpen(false);
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(`/discover${params}`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ChefHat className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Neighbor&apos;s Kitchen
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          className="mx-auto hidden max-w-md flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm md:flex"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, cuisines, or cooks..."
            className="h-7 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
          />
          <span className="hidden shrink-0 items-center gap-1 border-l border-border pl-2 text-xs text-muted-foreground lg:flex">
            <MapPin className="h-3.5 w-3.5" />
            San Francisco
          </span>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Button
            render={<Link href="/become-a-cook" />}
            nativeButton={false}
            variant="ghost"
            className="hidden rounded-full sm:inline-flex"
          >
            Become a Cook
          </Button>
          <Button
            render={<Link href="/discover" aria-label="Account" />}
            nativeButton={false}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden">
          <form onSubmit={handleSearch} className="mb-3 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, cuisines, or cooks..."
              className="h-6 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
