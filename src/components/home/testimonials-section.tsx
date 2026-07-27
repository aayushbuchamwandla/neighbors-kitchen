import { Quote, Star } from "lucide-react";
import { SectionHeader } from "./section-header";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Real neighbors, real trust"
        title="What Customers Are Saying"
        description="Every review comes from a real reservation — no anonymous ratings, no fake five-stars."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <figure key={t.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <Quote className="h-6 w-6 text-primary/40" />
            <blockquote className="mt-3 flex-1 text-sm text-foreground">&quot;{t.quote}&quot;</blockquote>
            <div className="mt-4 flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </div>
            <figcaption className="mt-2 text-sm">
              <span className="font-medium text-foreground">{t.authorName}</span>
              <span className="block text-xs text-muted-foreground">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
