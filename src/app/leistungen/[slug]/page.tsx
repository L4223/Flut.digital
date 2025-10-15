
import { services, type Service } from "@/config/services";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import CtaButton from "@/components/cta-button";
import Link from "next/link";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

function getServiceData(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug);
}


export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const service = getServiceData(params.slug);

    if (!service) {
        notFound();
    }

    const { Icon } = service;

    return (
        <div className="container mx-auto px-8 py-16 md:py-24">
            <div className="relative isolate py-8">
                <div className="absolute inset-0 radial-glow -z-10" />
                <header className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
                    <Badge variant="secondary" className="mb-4 text-sm font-medium">{service.category}</Badge>
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-secondary rounded-xl border">
                            <Icon className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{service.title}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {service.description}
                    </p>
                </header>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Was wir für Sie tun können</h2>
                    <div className="prose prose-invert text-muted-foreground max-w-none prose-h3:text-foreground prose-h3:font-semibold prose-strong:text-foreground">
                        {service.details}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <Card className="bg-secondary/50 sticky top-24">
                        <CardHeader>
                            <CardTitle>Kernleistungen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="text-center mt-20 md:mt-24">
                <h2 className="text-3xl font-bold mb-4">Bereit, Ihr Projekt zu starten?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Lassen Sie uns gemeinsam die digitale Zukunft Ihres Unternehmens gestalten.</p>
                <CtaButton asChild size="lg">
                    <Link href="/kontakt">
                        Kostenloses Erstgespräch
                    </Link>
                </CtaButton>
            </div>
        </div>
    );
}
