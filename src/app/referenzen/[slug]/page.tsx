
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import CtaButton from "@/components/cta-button";
import Link from "next/link";
import { references, type Reference } from "@/config/references";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateStaticParams() {
  return references.map((ref) => ({
    slug: ref.slug,
  }));
}

function getReferenceData(slug: string): Reference | undefined {
    return references.find((ref) => ref.slug === slug);
}

export default function ReferenceDetailPage({ params }: { params: { slug: string } }) {
    const reference = getReferenceData(params.slug);

    if (!reference) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="relative isolate py-8">
                <div className="absolute inset-0 radial-glow -z-10" />
                <header className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
                    <Badge variant="secondary" className="mb-4 text-sm font-medium">{reference.category}</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{reference.title}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {reference.description}
                    </p>
                </header>
            </div>
            
            <div className="mb-12 md:mb-16">
                 <Image
                    src={reference.imageUrl}
                    alt={reference.title}
                    width={1200}
                    height={630}
                    data-ai-hint={reference.imageHint}
                    className="w-full h-full object-cover rounded-lg border shadow-lg"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Projekt-Details</h2>
                    <div className="prose prose-invert text-muted-foreground max-w-none prose-h3:text-foreground prose-h3:font-semibold prose-strong:text-foreground">
                        {reference.details}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <Card className="bg-secondary/50 sticky top-24">
                        <CardHeader>
                            <CardTitle>Leistungen im Überblick</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {reference.features.map((feature, index) => (
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
