"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import DeviceMockup from "@/components/references/device-mockup";
import CtaButton from "@/components/cta-button";
import { staticReferences, type Reference } from "@/config/references";
import { getAllReferences } from "@/lib/references";
import { cn } from "@/lib/utils";

export default function ReferenzenPage() {
  const [references, setReferences] = useState<Reference[]>(staticReferences);

  useEffect(() => {
    getAllReferences().then(setReferences).catch(() => {});
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 sm:px-8 md:py-24">
      <motion.header
        className="mx-auto mb-16 max-w-3xl text-center md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Referenzen</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Ausgewählte Projekte</h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Websites, Web-Apps und WebXR-Anwendungen – jeweils mit der Aufgabe, unserer Lösung und den eingesetzten Technologien.
        </p>
      </motion.header>

      <div className="space-y-20 md:space-y-32">
        {references.map((ref, i) => (
          <motion.article
            key={ref.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
          >
            <div className={cn("min-w-0 lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
              <Link href={`/referenzen/${ref.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                <DeviceMockup
                  desktop={ref.imageUrl}
                  mobile={ref.mobileImageUrl}
                  alt={`Screenshot: ${ref.title}`}
                  label={ref.client}
                  priority={i === 0}
                />
              </Link>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <p className="text-sm font-medium text-accent">
                {ref.category}
                {ref.client && <span className="text-muted-foreground"> · {ref.client}</span>}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{ref.title}</h2>
              <p className="mt-4 text-muted-foreground">{ref.description}</p>
              {ref.stack && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Eingesetzte Technologien">
                  {ref.stack.map((t) => (
                    <li key={t} className="rounded-full border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">{t}</li>
                  ))}
                </ul>
              )}
              <Link
                href={`/referenzen/${ref.slug}`}
                className="group mt-8 inline-flex items-center gap-2 py-2 font-semibold text-primary hover:text-accent"
              >
                Case Study lesen<span className="sr-only">: {ref.title}</span>
                <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-24 text-center md:mt-32">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Ihr Projekt als nächste Referenz?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Erzählen Sie uns, was Sie vorhaben – wir melden uns mit einer ersten Einschätzung.
        </p>
        <CtaButton asChild size="lg">
          <Link href="/kontakt">Projekt anfragen</Link>
        </CtaButton>
      </div>
    </div>
  );
}
