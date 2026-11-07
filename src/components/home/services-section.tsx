"use client"
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services, type Service } from "@/config/services";
import { cn } from "@/lib/utils";
import CtaButton from "../cta-button";
import { serviceIllustrations } from "./service-illustrations";

// Bento layout: two wide cards on top, three below.
const ORDER = ["web", "ki", "3d-ar", "branding", "social"];
const SPAN: Record<string, string> = {
  web: "lg:col-span-3",
  ki: "lg:col-span-3",
  "3d-ar": "lg:col-span-2",
  branding: "lg:col-span-2",
  social: "md:col-span-2 lg:col-span-2",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Animations run only while the card is on screen.
  const inView = useInView(ref, { amount: 0.4 });
  const Illustration = serviceIllustrations[service.slug];

  return (
    <motion.div
      ref={ref}
      data-play={inView}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-secondary/40 transition-colors hover:border-primary/50 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
        SPAN[service.slug],
      )}
    >
      <div className="relative h-44 border-b bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_70%)] px-6 pt-4 md:h-52">
        {Illustration && <Illustration />}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold md:text-2xl">
            <Link href={`/leistungen/${service.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {service.title}
            </Link>
          </h3>
          <ArrowRight
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:text-primary motion-safe:group-hover:translate-x-1"
            aria-hidden
          />
        </div>
        <p className="mt-2 text-muted-foreground">{service.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Schwerpunkte ${service.title}`}>
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">{f}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ordered = ORDER.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean) as Service[];

  return (
    <section aria-labelledby="kompetenzen-titel">
      <motion.div
        className="mx-auto mb-12 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Leistungen</p>
        <h2 id="kompetenzen-titel" className="text-3xl font-bold tracking-tighter md:text-4xl">
          Unsere Kernkompetenzen
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Fünf Disziplinen, ein Team – und KI als Werkzeug in jeder davon.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {ordered.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton variant="outline" asChild>
          <Link href="/leistungen">Alle Leistungen ansehen</Link>
        </CtaButton>
      </div>
    </section>
  );
}
