"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cuisines } from "@/data/cuisines";

export function BecomeCookCta() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [pitch, setPitch] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="apply" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-light text-sage">
              <CircleCheck className="h-8 w-8" />
            </span>
            <div>
              <p className="font-heading text-xl font-semibold text-foreground">Application received!</p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thanks, {name.split(" ")[0] || "neighbor"} — we&apos;ll review your application and reach out
                within 2–3 days to start the verification process: ID check, food handler
                certification, and an in-person kitchen visit.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Apply to Cook</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us a bit about your kitchen. We&apos;ll follow up to start verification.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <Label htmlFor="cook-name" className="mb-2">
                  Your name
                </Label>
                <Input
                  id="cook-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <Label htmlFor="cook-neighborhood" className="mb-2">
                  Neighborhood
                </Label>
                <Input
                  id="cook-neighborhood"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Mission District, San Francisco"
                />
              </div>

              <div>
                <Label className="mb-2">Primary cuisine</Label>
                <Select value={cuisine} onValueChange={(value) => setCuisine(value ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisines.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cook-pitch" className="mb-2">
                  What do you love to cook?
                </Label>
                <Textarea
                  id="cook-pitch"
                  required
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Tell us about your signature dish, your story, and why neighbors should try your food."
                  className="min-h-28"
                />
              </div>

              <Button type="submit" size="lg" className="mt-2 w-full rounded-full">
                <Send className="h-4 w-4" />
                Submit Application
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
