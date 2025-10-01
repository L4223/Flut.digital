
"use client"
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "../ui/badge";
import CtaButton from "../cta-button";
import { motion } from "framer-motion";

const featuredReferences = [
  { slug: 'projekt-alpha', title: 'Corporate Re-Branding für Tech-Startup', category: 'Branding', imageUrl: 'https://picsum.photos/seed/ref1/600/400', imageHint: "abstract project" },
  { slug: 'projekt-beta', title: 'Headless E-Commerce Plattform', category: 'Webentwicklung', imageUrl: 'https://picsum.photos/seed/ref2/600/400', imageHint: "abstract technology" },
  { slug: 'projekt-gamma', title: 'Interaktive AR-Anwendung für Museum', category: '3D/AR', imageUrl: 'https://picsum.photos/seed/ref3/600/400', imageHint: "digital branding" },
  { slug: 'projekt-delta', title: 'KI-gestützte Daten-Analyse-Tools', category: 'KI-Lösungen', imageUrl: 'https://picsum.photos/seed/ref4/600/400', imageHint: "data analytics" },
];

export default function ReferencesSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                    Ausgewählte Projekte
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                    Werfen Sie einen Blick auf einige unserer erfolgreich umgesetzten Referenzen.
                </p>
            </div>
            
            <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {featuredReferences.map((ref, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Link href={`/referenzen/${ref.slug}`} className="group">
                                    <Card className="overflow-hidden h-full">
                                        <CardHeader className="p-0 relative">
                                            <div className="aspect-video overflow-hidden">
                                                 <Image
                                                    src={ref.imageUrl}
                                                    alt={ref.title}
                                                    width={600}
                                                    height={400}
                                                    data-ai-hint={ref.imageHint}
                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <Badge>{ref.category}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-bold truncate">{ref.title}</h3>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
            <div className="mt-12 text-center">
                <CtaButton variant="outline" asChild>
                    <Link href="/referenzen">Alle Projekte ansehen</Link>
                </CtaButton>
            </div>
        </motion.section>
    );
}
