"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Minus, Plus, CircleCheck, MapPin, Clock, Ticket, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Cook, Meal } from "@/lib/types";

interface ReserveModalProps {
  meal: Meal;
  cook: Cook;
}

function generateOrderNumber(mealId: string) {
  const prefix = mealId.replace("meal-", "").slice(0, 3).toUpperCase();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `NK-${prefix}-${suffix}`;
}

function QrPlaceholder({ seed }: { seed: string }) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;

  const cells = Array.from({ length: 49 }, (_, i) => {
    const bit = (hash >> (i % 24)) & 1;
    const isFinder =
      (i < 21 && i % 7 < 3) ||
      (i % 7 >= 4 && i < 21) ||
      (i >= 28 && i % 7 < 3);
    return isFinder ? 1 : bit;
  });

  return (
    <div className="grid grid-cols-7 gap-0.5 rounded-lg bg-white p-3 shadow-sm">
      {cells.map((filled, i) => (
        <span key={i} className={cn("h-2.5 w-2.5 rounded-[1px]", filled ? "bg-charcoal" : "bg-transparent")} />
      ))}
    </div>
  );
}

export function ReserveModal({ meal, cook }: ReserveModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const maxQuantity = Math.min(meal.portionsRemaining, 6);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setStep("form");
        setQuantity(1);
        setInstructions("");
      }, 200);
    }
  }

  function handleReserve() {
    setOrderNumber(generateOrderNumber(meal.id));
    setStep("success");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="lg" className="w-full rounded-full sm:w-auto sm:px-10">
            Reserve Meal — ${meal.price * quantity}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Reserve {meal.name}</DialogTitle>
              <DialogDescription>From {cook.name} · {cook.neighborhood}, {cook.city}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {meal.pickupDay}, {meal.pickupWindow}
                </span>
                <span className="text-xs text-muted-foreground">{meal.portionsRemaining} left</span>
              </div>

              <div>
                <Label className="mb-2">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-heading text-lg font-semibold text-foreground">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                    disabled={quantity >= maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="ml-auto font-heading text-lg font-semibold text-foreground">
                    ${meal.price * quantity}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="instructions" className="mb-2">
                  Pickup instructions <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. I'll be there a few minutes early, or text me when it's ready"
                  className="min-h-20"
                />
              </div>

              <p className="rounded-xl bg-secondary px-3 py-2 text-xs text-secondary-foreground">
                <ShoppingBag className="mr-1 inline h-3.5 w-3.5" />
                Pickup only for now — delivery is on our roadmap.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleReserve}>Confirm Reservation</Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-light text-sage">
              <CircleCheck className="h-8 w-8" />
            </span>
            <div>
              <p className="font-heading text-xl font-semibold text-foreground">Reservation Confirmed!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {quantity} × {meal.name} from {cook.name}
              </p>
            </div>

            <QrPlaceholder seed={orderNumber} />

            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Ticket className="h-4 w-4 text-primary" />
              {orderNumber}
            </div>

            <div className="w-full rounded-xl border border-border bg-muted/40 p-4 text-left">
              <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Pickup address
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {cook.neighborhood}, {cook.city} — exact address sent after confirmation
              </p>
              <div className="mt-3 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-sage-light to-secondary text-xs text-muted-foreground">
                Map preview
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-foreground">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {meal.pickupDay}, {meal.pickupWindow}
              </p>
            </div>

            <p className="rounded-xl bg-secondary px-3 py-2 text-xs text-secondary-foreground">
              Pickup only — show this order number at pickup. Delivery is coming soon.
            </p>

            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
