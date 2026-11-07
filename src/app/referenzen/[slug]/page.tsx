"use client"
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CtaButton from "@/components/cta-button";
import DeviceMockup from "@/components/references/device-mockup";
import { staticReferences, type Reference } from "@/config/references";
import { getReference } from "@/lib/references";

export default function ReferenceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const local = staticReferences.find((r) => r.slug === slug) ?? null;
  const [reference, setReference] = useState<Reference | null>(local);
  const [loading, setLoading] = useState(!local);

  useEffect(() => {
    if (!slug) return;
    getReference(slug)
      .catch(() => null)
      .then((data) => {
        if (data) setReference(data);
        setLoading(false);
      });
  }, [slug]);

  if (!reference && loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground md:py-24" role="status">
        Referenz wird geladen …
      </div>
    );
  }

  if (!reference) notFound();

  return (
    <article className="container mx-auto px-4 py-16 sm:px-8 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/referenzen" className="mb-10 inline-flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Alle Referenzen
        </Link>

        <header className="mb-12 max-w-4xl md:mb-16">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-sm font-medium">{reference.category}</Badge>
            {reference.client && <span className="text-sm text-muted-foreground">{reference.client}</span>}
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">{reference.title}</h1>
          <p className="text-lg text-muted-foreground md:text-xl">{reference.description}</p>
        </header>

        <DeviceMockup
          desktop={reference.imageUrl}
          mobile={reference.mobileImageUrl}
          alt={`Screenshot: ${reference.title}`}
          label={reference.client}
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="mb-16 md:mb-24"
        />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {(reference.challenge || reference.solution) && (
              <div className="grid gap-8 md:grid-cols-2">
                {reference.challenge && (
                  <section>
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Ausgangslage</h2>
                    <p className="text-muted-foreground">{reference.challenge}</p>
                  </section>
                )}
                {reference.solution && (
                  <section>
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Lösung</h2>
                    <p className="text-muted-foreground">{reference.solution}</p>
                  </section>
                )}
              </div>
            )}

            <section>
              <h2 className="mb-4 text-2xl font-bold">Umsetzung</h2>
              <p className="text-muted-foreground">{reference.details as string}</p>
            </section>

            {reference.aiNote && (
              <aside className="flex gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">KI im Projekt: </strong>
                  {reference.aiNote}
                </p>
              </aside>
            )}

            {reference.gallery && reference.gallery.length > 0 && (
              <section>
                <h2 className="mb-6 text-2xl font-bold">Einblicke</h2>
                <div className="grid gap-6">
                  {reference.gallery.map((img) => (
                    <figure key={img.src} className="overflow-hidden rounded-xl border bg-card">
                      <Image src={img.src} alt={img.alt} width={1440} height={900} sizes="(min-width: 1024px) 66vw, 100vw" className="h-auto w-full" />
                      <figcaption className="px-4 py-3 text-sm text-muted-foreground">{img.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border bg-secondary/50 p-6">
              <h2 className="mb-4 text-lg font-bold">Leistungen im Überblick</h2>
              <ul className="space-y-3">
                {reference.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {reference.stack && (
              <div className="rounded-xl border bg-secondary/50 p-6">
                <h2 className="mb-4 text-lg font-bold">Technologien</h2>
                <ul className="flex flex-wrap gap-2">
                  {reference.stack.map((t) => (
                    <li key={t} className="rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground">{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-20 text-center md:mt-28">
          <h2 className="mb-4 text-3xl font-bold">Bereit, Ihr Projekt zu starten?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Erzählen Sie uns von Ihrer Idee – wir zeigen Ihnen, wie wir sie umsetzen würden.
          </p>
          <CtaButton asChild size="lg">
            <Link href="/kontakt">Projekt anfragen</Link>
          </CtaButton>
        </div>
      </motion.div>
    </article>
  );
}
