"use client"
import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { techLayers } from "@/config/tech";
import { cn } from "@/lib/utils";

/**
 * The tech stack as five stacked layers. Picking a layer (tabs on the right or
 * the slabs in the graphic) explains in plain words what it does for the client.
 */
export default function TechStackSection() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const layer = techLayers[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + techLayers.length) % techLayers.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <motion.section
      aria-labelledby="tech-titel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Tech-Stack</p>
        <h2 id="tech-titel" className="text-3xl font-bold tracking-tighter md:text-4xl">
          Was unter der Haube steckt
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Jede Website besteht aus Schichten. Hier sehen Sie, welche Technologien wir wofür einsetzen – und was Sie davon haben.
        </p>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Isometric layer graphic */}
        <div className="relative mx-auto hidden h-[400px] w-full max-w-md sm:block" aria-hidden="true">
          {techLayers.map((l, i) => {
            const isActive = i === active;
            const Icon = l.icon;
            return (
              <button
                key={l.id}
                type="button"
                tabIndex={-1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="absolute left-1/2 top-0 h-[200px] w-[200px] cursor-pointer motion-safe:transition-transform motion-safe:duration-500"
                style={{
                  transform: `translate(-50%, ${40 + i * 58 - (isActive ? 18 : 0)}px) rotateX(58deg) rotateZ(-45deg)`,
                  zIndex: techLayers.length - i,
                }}
              >
                <span
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-2xl border-2 transition-colors duration-300",
                    isActive
                      ? "border-accent bg-primary/30 shadow-[0_0_40px_hsl(var(--accent)/0.45)]"
                      : "border-white/15 bg-secondary/90",
                  )}
                >
                  <Icon className={cn("h-12 w-12 rotate-45", isActive ? "text-accent" : "text-muted-foreground/50")} />
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <div role="tablist" aria-label="Ebenen des Tech-Stacks" className="mb-6 flex flex-wrap gap-2" onKeyDown={onKeyDown}>
            {techLayers.map((l, i) => (
              <button
                key={l.id}
                ref={(el) => { tabsRef.current[i] = el; }}
                role="tab"
                id={`tech-tab-${l.id}`}
                aria-selected={i === active}
                aria-controls="tech-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  i === active ? "border-primary bg-primary/15 text-foreground" : "text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                <l.icon className="h-4 w-4" aria-hidden />
                {l.name}
              </button>
            ))}
          </div>

          <div id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${layer.id}`} className="rounded-2xl border bg-secondary/40 p-6 md:p-8">
            <motion.div key={layer.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <p className="text-sm font-semibold text-accent">{layer.label}</p>
              <h3 className="mt-1 text-2xl font-bold">{layer.name}</h3>
              <p className="mt-3 text-muted-foreground">{layer.benefit}</p>
              <dl className="mt-6 space-y-4">
                {layer.stack.map((t) => (
                  <div key={t.name} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                    <dt className="font-semibold">{t.name}</dt>
                    <dd className="text-sm text-muted-foreground">{t.what}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
          <Link href="/tech" className="group mt-6 inline-flex items-center gap-2 py-2 font-semibold text-primary hover:text-accent">
            Mehr zum Tech-Stack und KI im Entwicklungsprozess
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
