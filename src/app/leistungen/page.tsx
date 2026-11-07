import { services } from "@/config/services";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LeistungenPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-8 md:py-24">
      <header className="mb-12 text-center md:mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Unsere Leistungen</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
          Wir bieten ein umfassendes Spektrum an digitalen Dienstleistungen, um Ihre Visionen Wirklichkeit werden zu lassen.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const { Icon } = service;
          return (
            <li
              key={service.slug}
              className="group relative flex flex-col rounded-2xl border bg-secondary/40 p-6 transition-colors hover:border-primary/50 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring md:p-8"
            >
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <Icon className="h-6 w-6 shrink-0 text-accent" aria-hidden />
                <Link href={`/leistungen/${service.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {service.title}
                </Link>
                <ArrowRight
                  className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:text-primary motion-safe:group-hover:translate-x-1"
                  aria-hidden
                />
              </h2>
              <p className="mt-3 text-muted-foreground">{service.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Schwerpunkte ${service.title}`}>
                {service.features.slice(0, 3).map((f) => (
                  <li key={f} className="rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
