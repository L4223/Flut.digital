"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CtaButton from "@/components/cta-button";
import { techLayers, aiWorkflowTools } from "@/config/tech";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export default function TechPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-8 md:py-24">
      <motion.header
        className="mx-auto mb-16 max-w-3xl text-center md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Tech-Stack</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Moderne Technik, verständlich erklärt</h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Sie müssen kein Framework kennen, um eine gute Website zu bekommen. Trotzdem sollen Sie wissen, worauf Ihr Projekt
          aufbaut – und warum.
        </p>
      </motion.header>

      {/* KI im Entwicklungsprozess */}
      <motion.section {...reveal} aria-labelledby="ki-prozess" className="mb-24 rounded-3xl border border-primary/30 bg-primary/5 p-6 md:mb-32 md:p-12">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <Sparkles className="h-4 w-4" aria-hidden /> So entwickeln wir
            </p>
            <h2 id="ki-prozess" className="text-3xl font-bold tracking-tight">KI im Entwicklungsprozess</h2>
            <p className="mt-4 text-muted-foreground">
              KI steckt bei uns nicht nur in den Produkten, sondern in unserer täglichen Arbeit. Sie übernimmt Routine,
              beschleunigt Prototypen und prüft Qualität – damit mehr Zeit für Konzept, Design und Feinschliff bleibt.
            </p>
            <p className="mt-4 text-muted-foreground">
              Wichtig dabei: Die Verantwortung bleibt beim Menschen. Jedes Ergebnis wird geprüft, bevor es zu Ihnen geht.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {aiWorkflowTools.map((t) => (
              <li key={t.name} className="rounded-2xl border bg-background/60 p-5">
                <h3 className="font-semibold">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.what}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Layers */}
      <section aria-labelledby="ebenen">
        <motion.div {...reveal} className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="ebenen" className="text-3xl font-bold tracking-tight">Fünf Ebenen, ein Produkt</h2>
          <p className="mt-4 text-muted-foreground">
            Von dem, was Ihre Besucher sehen, bis zu dem, wo alles läuft.
          </p>
        </motion.div>

        <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-px before:bg-border md:before:left-8">
          {techLayers.map((layer, i) => (
            <motion.li key={layer.id} {...reveal} className="relative pl-16 md:pl-24">
              <div className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-xl border bg-background md:h-16 md:w-16">
                <layer.icon className="h-6 w-6 text-primary md:h-7 md:w-7" aria-hidden />
              </div>
              <div className="grid gap-6 rounded-2xl border bg-secondary/40 p-6 md:p-8 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ebene {i + 1}</p>
                  <h3 className="mt-1 text-2xl font-bold">{layer.name}</h3>
                  <p className="mt-1 font-medium text-accent">{layer.label}</p>
                  <p className="mt-3 text-muted-foreground">{layer.benefit}</p>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
                  {layer.stack.map((t) => (
                    <div key={t.name} className="rounded-xl border bg-background/50 p-4">
                      <dt className="font-semibold">{t.name}</dt>
                      <dd className="mt-1 text-sm text-muted-foreground">{t.what}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <div className="mt-24 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Welche Technik passt zu Ihrem Projekt?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Wir wählen nicht das Neueste, sondern das Passende – und erklären Ihnen, warum.
        </p>
        <CtaButton asChild size="lg">
          <Link href="/kontakt">Projekt besprechen</Link>
        </CtaButton>
      </div>
    </div>
  );
}
