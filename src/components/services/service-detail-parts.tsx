"use client"
import { useRef } from "react";
import { useInView } from "framer-motion";
import { serviceIllustrations } from "@/components/home/service-illustrations";

/** Animated illustration from the homepage cards; plays only while visible. */
export function ServiceIllustration({ slug, className }: { slug: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const Illustration = serviceIllustrations[slug];
  if (!Illustration) return null;
  return (
    <div ref={ref} data-play={inView} className={className}>
      <Illustration />
    </div>
  );
}
