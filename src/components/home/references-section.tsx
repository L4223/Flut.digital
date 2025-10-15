
"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "../ui/badge";
import CtaButton from "../cta-button";
import { motion } from "framer-motion";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Reference } from "@/config/references";

type ReferenceWithId = Reference & { id: string };

export default function ReferencesSection() {
    const [featuredReferences, setFeaturedReferences] = useState<ReferenceWithId[]>([]);

    useEffect(() => {
        const fetchReferences = async () => {
            if (!db) return;
            const q = query(collection(db, "references"), limit(4));
            const querySnapshot = await getDocs(q);
            const refsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReferenceWithId));
            setFeaturedReferences(refsData);
        };
        fetchReferences();
    }, []);

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
            
            <div className="overflow-x-clip">
              <Carousel opts={{ loop: featuredReferences.length > 1 }} className="w-full">
                  <CarouselContent>
                      {featuredReferences.map((ref) => (
                          <CarouselItem key={ref.id} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1 h-full">
                                  <Link href={`/referenzen/${ref.slug}`} className="group flex h-full">
                                      <Card className="overflow-hidden h-full w-full">
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
            </div>
            <div className="mt-12 text-center">
                <CtaButton variant="outline" asChild>
                    <Link href="/referenzen">Alle Projekte ansehen</Link>
                </CtaButton>
            </div>
        </motion.section>
    );
}
