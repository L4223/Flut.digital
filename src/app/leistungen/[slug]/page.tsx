import { services, type Service } from "@/config/services";
import { staticReferences } from "@/config/references";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Sparkles } from "lucide-react";
import CtaButton from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceIllustration } from "@/components/services/service-detail-parts";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceData(slug);
  if (!service) return {};
  return { title: { absolute: `${service.title} | Flut.digital` }, description: service.description };
}

function getServiceData(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

function SectionHeading({ title, text, id }: { title: string; text?: string; id: string }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-12">
      <h2 id={id} className="text-3xl font-bold tracking-tighter md:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceData(slug);

  if (!service) {
    notFound();
  }

  const { Icon } = service;
  const references = service.references
    .map((s) => staticReferences.find((r) => r.slug === s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const single = references.length === 1;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        serviceType: service.title,
        url: `${siteConfig.url}/leistungen/${service.slug}`,
        areaServed: "DE",
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-8 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate" aria-labelledby="service-titel">
        <div className="absolute inset-0 -z-10 radial-glow" aria-hidden="true" />
        <nav aria-label="Brotkrumen" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/leistungen" className="hover:text-foreground">
                Leistungen
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="text-foreground">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1 text-sm font-medium">
              <Icon className="h-4 w-4 text-accent" aria-hidden />
              {service.category}
            </p>
            <h1 id="service-titel" className="text-4xl font-bold tracking-tighter md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">{service.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Schwerpunkte ${service.title}`}>
              {service.features.map((f) => (
                <li key={f} className="rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton asChild size="lg">
                <Link href="/kontakt">
                  Kostenloses Erstgespräch
                  <ArrowRight className="ml-1" aria-hidden />
                </Link>
              </CtaButton>
              <Button asChild size="lg" variant="outline">
                <a href="#leistungsumfang">Leistungsumfang ansehen</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border bg-secondary/40">
              <div className="aspect-[16/10] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)] p-6">
                <ServiceIllustration slug={service.slug} className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Intro + outcomes ---------- */}
      <section className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-16" aria-labelledby="intro-titel">
        <div className="lg:col-span-7">
                    <h2 id="intro-titel" className="text-3xl font-bold tracking-tighter md:text-4xl">
            {service.intro.heading}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {service.intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border bg-secondary/40 p-6 md:p-8">
            <h3 className="text-lg font-semibold">Was Sie davon haben</h3>
            <ul className="mt-5 space-y-4">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-4 w-4 text-accent" aria-hidden />
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Offerings ---------- */}
      <section id="leistungsumfang" className="mt-24 scroll-mt-24 md:mt-32" aria-labelledby="umfang-titel">
        <SectionHeading
          id="umfang-titel"
          title="Was wir konkret für Sie umsetzen"
          text="Einzeln buchbar oder als Paket – wir stellen zusammen, was Ihr Projekt wirklich braucht."
        />
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((o) => (
            <li key={o.title} className="border-t pt-6">
              <h3 className="flex items-center gap-3 text-lg font-semibold">
                <o.Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                {o.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{o.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Use cases ---------- */}
      <section className="mt-24 md:mt-32" aria-labelledby="einsatz-titel">
        <SectionHeading id="einsatz-titel" title="Wofür Kunden uns beauftragen" />
        <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {service.useCases.map((u) => (
            <li key={u.title} className="bg-background p-6 md:p-8">
              <h3 className="text-xl font-semibold">{u.title}</h3>
              <p className="mt-3 text-muted-foreground">{u.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Process + AI ---------- */}
      <section className="mt-24 md:mt-32" aria-labelledby="ablauf-titel">
        <SectionHeading
          id="ablauf-titel"
          title="So läuft ein Projekt ab"
          text="Klare Schritte, regelmäßige Zwischenstände und keine Überraschungen bei Zeit und Budget."
        />
        <div className="relative">
        <div
          className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-primary/60 via-accent/40 to-transparent lg:block"
          aria-hidden="true"
        />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-background font-bold text-accent shadow-[0_0_0_6px_hsl(var(--background))]">
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 lg:col-span-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-accent">
              <Sparkles className="h-4 w-4" aria-hidden />
              So setzen wir KI hier ein
            </p>
            <p className="mt-3 text-lg leading-relaxed">{service.aiNote}</p>
          </div>
          <div className="rounded-2xl border bg-secondary/40 p-6 md:p-8 lg:col-span-2">
            <p className="text-sm font-semibold text-muted-foreground">Werkzeuge & Technologien</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.stack.map((t) => (
                <li key={t} className="rounded-md border bg-background/60 px-2.5 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/tech" className="mt-5 inline-flex items-center gap-1 text-sm text-accent hover:underline">
              Mehr zu unserem Tech-Stack <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- References ---------- */}
      {references.length > 0 && (
        <section className="mt-24 md:mt-32" aria-labelledby="referenzen-titel">
          <SectionHeading id="referenzen-titel" title="Projekte aus diesem Bereich" />
          <div className={cn("grid gap-6", references.length > 1 && "md:grid-cols-2")}>
            {references.map((ref, i) => (
              <div
                key={ref.slug}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-secondary/40 transition-colors hover:border-primary/50 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
                  single && "md:grid md:grid-cols-2 md:items-center",
                )}
              >
                <div className={cn("relative aspect-[16/9] overflow-hidden border-b", single && "md:h-full md:border-b-0 md:border-r")}>
                  <Image
                    src={ref.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className={cn("p-6", single && "md:p-10")}>
                  <p className="text-sm font-medium text-accent">{ref.category}</p>
                  <h3 className="mt-1 flex items-start justify-between gap-4 text-xl font-bold">
                    <Link href={`/referenzen/${ref.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {ref.title}
                    </Link>
                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:text-primary motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </h3>
                  <p className={cn("mt-2 text-muted-foreground", !single && "line-clamp-2")}>{ref.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      <section className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-16" aria-labelledby="faq-titel">
        <div className="lg:col-span-4">
                    <h2 id="faq-titel" className="text-3xl font-bold tracking-tighter md:text-4xl">
            Häufige Fragen
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ihre Frage ist nicht dabei? Schreiben Sie uns oder fragen Sie den Chat-Assistenten unten rechts.
          </p>
          <Link href="/kontakt" className="mt-4 inline-flex items-center gap-1 text-accent hover:underline">
            Frage stellen <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <Accordion type="single" collapsible className="lg:col-span-8">
          {service.faq.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative mt-24 overflow-hidden rounded-2xl border p-8 text-center md:mt-32 md:p-16">
        <div className="absolute inset-0 -z-10 radial-glow" aria-hidden="true" />
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Lassen Sie uns über Ihr Projekt sprechen</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          In einem kostenlosen Erstgespräch klären wir, was Sie vorhaben, was sinnvoll ist und womit Sie rechnen können –
          unverbindlich und ehrlich.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton asChild size="lg">
            <Link href="/kontakt">
              Kostenloses Erstgespräch
              <ArrowRight className="ml-1" aria-hidden />
            </Link>
          </CtaButton>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </Button>
        </div>
      </section>

      {/* ---------- Other services ---------- */}
      <nav className="mt-24 md:mt-32" aria-labelledby="weitere-titel">
        <h2 id="weitere-titel" className="mb-6 text-xl font-semibold">
          Weitere Leistungen
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/leistungen/${s.slug}`}
                className="group flex h-full items-center gap-4 rounded-xl border bg-secondary/40 p-4 transition-colors hover:border-primary/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                  <s.Icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <span className="font-medium">{s.title}</span>
                <ArrowRight
                  className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:text-primary motion-safe:group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
