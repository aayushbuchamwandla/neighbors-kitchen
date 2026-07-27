import { cn } from "@/lib/utils";
import { getThemeStyle } from "./theme";

interface CookAvatarProps {
  name: string;
  theme: string;
  className?: string;
  textClassName?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export function CookAvatar({ name, theme, className, textClassName }: CookAvatarProps) {
  const style = getThemeStyle(theme);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br font-heading font-semibold text-white shadow-sm",
        style.gradient,
        className ?? "h-12 w-12 text-sm"
      )}
    >
      <span className={textClassName}>{getInitials(name)}</span>
    </div>
  );
}
