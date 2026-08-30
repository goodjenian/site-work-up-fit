"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a page_view once per route. Provider-agnostic; see lib/analytics. */
export function PageView({ title }: { title?: string }) {
  const pathname = usePathname();
  useEffect(() => {
    track("page_view", { page_path: pathname, page_title: title });
  }, [pathname, title]);
  return null;
}
