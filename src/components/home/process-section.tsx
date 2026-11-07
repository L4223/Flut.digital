"use client"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, DraftingCompass, Code, Rocket, Sparkles, UserCheck, Gauge, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Discovery & Strategie",
    icon: Lightbulb,
    human: "Wir verstehen Ihr Geschäft, Ihre Zielgruppe und Ihre Ziele.",
    ai: "KI beschleunigt Recherche, Wettbewerbsanalyse und das Strukturieren von Anforderungen.",
  },
  {
    title: "Design & Prototyp",
    icon: DraftingCompass,
    human: "Wir gestalten ein Konzept, das zu Ihrer Marke passt.",
    ai: "Mit KI entstehen früh klickbare Prototypen statt statischer Entwürfe – Sie testen echte Abläufe.",
  },
  {
    title: "Entwicklung",
    icon: Code,
    human: "Wir entscheiden Architektur und Qualität und prüfen jede Zeile.",
    ai: "KI-Coding-Assistenten übernehmen Routinecode, Tests und Code-Reviews.",
  },
  {
    title: "Launch & Optimierung",
    icon: Rocket,
    human: "Wir bringen Ihr Projekt live und begleiten es weiter.",
    ai: "Automatisierte Prüfungen für Barrierefreiheit, Performance und SEO decken Schwachstellen auf.",
  },
];

const principles = [
  {
    icon: Gauge,
    title: "Effizienter",
    text: "KI übernimmt Routinearbeit. Ihr Budget fließt in Konzept, Design und Details.",
  },
  {
    icon: UserCheck,
    title: "Mensch entscheidet",
    text: "Jedes Ergebnis wird von uns geprüft, bevor es live geht. KI ist Werkzeug, nicht Autor.",
  },
  {
    icon: ShieldCheck,
    title: "Verantwortungsvoll",
    text: "Vertrauliche Daten geben wir nur nach Absprache an KI-Dienste weiter.",
  },
];

export default function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const play = useInView(lineRef, { amount: 0.3 });

  return (
    <section aria-labelledby="prozess-titel">
      <motion.div
        className="mx-auto mb-14 max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold text-accent">
          <Sparkles className="h-4 w-4" aria-hidden /> KI-gestützter Workflow
        </p>
        <h2 id="prozess-titel" className="text-3xl font-bold tracking-tighter md:text-4xl">
          Erfahrung am Steuer, KI als Turbo
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Wir setzen künstliche Intelligenz gezielt in jedem Projektschritt ein – für kürzere Wege, mehr Zeit für Qualität und
          bessere Ergebnisse. Die Entscheidungen treffen wir.
        </p>
      </motion.div>

      <div ref={lineRef} data-play={play} className="relative">
        {/* Connecting line with flowing data (desktop) */}
        <div className="illu pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-border lg:block" aria-hidden="true">
          <div className="illu-dash h-full w-full" />
        </div>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border bg-background shadow-[0_0_0_6px_hsl(var(--background))]">
                <step.icon className="h-6 w-6 text-primary" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col rounded-2xl border bg-secondary/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Schritt {i + 1}</p>
                <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.human}</p>
                <p className="mt-4 flex gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>
                    <span className="sr-only">KI-Unterstützung: </span>
                    {step.ai}
                  </span>
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {principles.map((p) => (
          <div key={p.title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-secondary/60">
              <p.icon className="h-5 w-5 text-accent" aria-hidden />
            </div>
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
