import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4;
type Size = "display-xl" | "display-lg" | "display-md" | "display-sm";

const sizeClass: Record<Size, string> = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "display-sm": "text-display-sm",
};

export function Heading({
  level = 2,
  size = "display-md",
  italic = false,
  className,
  children,
  id,
}: {
  level?: Level;
  size?: Size;
  italic?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag
      id={id}
      className={cn(
        italic ? "font-display-italic" : "font-display",
        sizeClass[size],
        "text-balance text-chalk",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
