"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CtaButton from "../cta-button";
import DeviceMockup from "../references/device-mockup";
import { staticReferences, type Reference } from "@/config/references";
import { getAllReferences } from "@/lib/references";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export default function ReferencesSection() {
  // Static case studies render immediately; CMS entries are merged in afterwards.
  const [items, setItems] = useState<Reference[]>(staticReferences);

  useEffect(() => {
    getAllReferences().then(setItems).catch(() => {});
  }, []);

  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <section aria-labelledby="referenzen-titel">
      <motion.div {...reveal} className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Referenzen</p>
          <h2 id="referenzen-titel" className="text-3xl font-bold tracking-tighter md:text-4xl">
            Projekte, die im Einsatz sind
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Vom Dorfcafé bis zur AR-Lernplattform: ein Blick auf echte Arbeiten – mit Screenshots, Aufgabe und Lösung.
          </p>
        </div>
        <Link href="/referenzen" className="group inline-flex items-center gap-2 py-2 font-semibold text-primary hover:text-accent">
          Alle Projekte
          <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
        </Link>
      </motion.div>

      {/* Featured project */}
      <motion.article {...reveal} className="group relative grid items-center gap-8 rounded-2xl border bg-secondary/40 p-6 md:p-10 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <DeviceMockup
            desktop={featured.imageUrl}
            mobile={featured.mobileImageUrl}
            alt={`Screenshot: ${featured.title}`}
            label={featured.client}
          />
        </div>
        <div className="lg:col-span-2">
          <p className="text-sm font-medium text-accent">{featured.category}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            <Link href={`/referenzen/${featured.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
              {featured.title}
            </Link>
          </h3>
          <p className="mt-4 text-muted-foreground">{featured.description}</p>
          {featured.stack && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Eingesetzte Technologien">
              {featured.stack.slice(0, 4).map((t) => (
                <li key={t} className="rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">{t}</li>
              ))}
            </ul>
          )}
          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-primary group-hover:text-accent" aria-hidden>
            Case Study ansehen
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </span>
        </div>
      </motion.article>

      {rest.length > 0 && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.slice(0, 2).map((ref, i) => (
            <motion.article
              key={ref.slug}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-2xl border bg-secondary/40 p-6 transition-colors has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring hover:border-primary/50"
            >
              <DeviceMockup
                desktop={ref.imageUrl}
                mobile={ref.mobileImageUrl}
                alt={`Screenshot: ${ref.title}`}
                sizes="(min-width: 768px) 45vw, 100vw"
              />
              <p className="mt-6 text-sm font-medium text-accent">{ref.category}</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight">
                <Link href={`/referenzen/${ref.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                  {ref.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-muted-foreground">{ref.description}</p>
            </motion.article>
          ))}
        </div>
      )}

      <div className="mt-12 text-center md:hidden">
        <CtaButton variant="outline" asChild>
          <Link href="/referenzen">Alle Projekte ansehen</Link>
        </CtaButton>
      </div>
    </section>
  );
}
