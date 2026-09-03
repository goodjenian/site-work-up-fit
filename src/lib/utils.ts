import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge cannot know that `text-display-lg` is a font size rather than
 * a text colour, so by default it treats `text-display-lg text-chalk` as two
 * competing colours and silently drops the size. Declaring the custom scale
 * here keeps size and colour in separate conflict groups.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl", "display-lg", "display-md", "display-sm",
            "hero", "index", "stat", "calm-lg", "calm-md",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Adds an alpha channel to a #RRGGBB hex string. */
export function alpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / ${a})`;
}
