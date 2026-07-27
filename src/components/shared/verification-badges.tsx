import {
  IdCard,
  Award,
  ChefHat,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationBadges as VerificationBadgesType } from "@/lib/types";

interface BadgeMeta {
  key: keyof VerificationBadgesType;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}

export const verificationBadgeMeta: BadgeMeta[] = [
  { key: "governmentId", label: "Government ID Verified", shortLabel: "ID Verified", description: "Identity confirmed with a government-issued ID.", icon: IdCard },
  { key: "foodHandlerCertified", label: "Food Handler Certified", shortLabel: "Food Safety", description: "Holds a current food handler safety certification.", icon: Award },
  { key: "kitchenVerified", label: "Kitchen Verified", shortLabel: "Kitchen Verified", description: "Home kitchen inspected and verified in person.", icon: ChefHat },
  { key: "phoneVerified", label: "Phone Verified", shortLabel: "Phone Verified", description: "Phone number confirmed for order updates.", icon: Phone },
  { key: "emailVerified", label: "Email Verified", shortLabel: "Email Verified", description: "Email address confirmed.", icon: Mail },
  { key: "backgroundCheck", label: "Background Check Complete", shortLabel: "Background Check", description: "Passed a third-party background check.", icon: ShieldCheck },
  { key: "neighborhoodTrusted", label: "Neighborhood Trusted Cook", shortLabel: "Neighborhood Trusted", description: "Highly rated by repeat customers nearby.", icon: Heart },
];

interface VerificationBadgesProps {
  verification: VerificationBadgesType;
  variant?: "full" | "compact";
  className?: string;
}

export function VerificationBadgeList({ verification, variant = "full", className }: VerificationBadgesProps) {
  const earned = verificationBadgeMeta.filter((badge) => verification[badge.key]);

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
        {earned.map((badge) => (
          <span
            key={badge.key}
            title={badge.label}
            className="flex items-center gap-1 rounded-full bg-sage-light px-2 py-1 text-xs font-medium text-sage"
          >
            <badge.icon className="h-3 w-3" />
            {badge.shortLabel}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
      {verificationBadgeMeta.map((badge) => {
        const isEarned = verification[badge.key];
        return (
          <div
            key={badge.key}
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-3",
              isEarned ? "border-sage/30 bg-sage-light" : "border-border bg-muted/50 opacity-50"
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                isEarned ? "bg-sage text-white" : "bg-muted-foreground/20 text-muted-foreground"
              )}
            >
              <badge.icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
