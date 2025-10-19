
"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import CtaButton from "../cta-button";
import { motion } from "framer-motion";
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Reference } from "@/config/references";

type ReferenceWithId = Reference & { id: string };

export default function ReferencesSection() {
    const [latestReferences, setLatestReferences] = useState<ReferenceWithId[]>([]);

    useEffect(() => {
        const fetchReferences = async () => {
            if (!db) return;
            const q = query(collection(db, "references"), orderBy("createdAt", "desc"), limit(3));
            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const refsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReferenceWithId));
                    setLatestReferences(refsData);
                } else {
                    const fallbackQuery = query(collection(db, "references"), limit(3));
                    const fallbackSnapshot = await getDocs(fallbackQuery);
                    if(!fallbackSnapshot.empty){
                        const refsData = fallbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReferenceWithId));
                        setLatestReferences(refsData);
                    }
                }
            } catch (error) {
                console.error("Error fetching latest references, trying fallback:", error);
                const fallbackQuery = query(collection(db, "references"), limit(3));
                const fallbackSnapshot = await getDocs(fallbackQuery);
                if(!fallbackSnapshot.empty){
                    const refsData = fallbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReferenceWithId));
                    setLatestReferences(refsData);
                }
            }
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
                    Werfen Sie einen Blick auf unsere aktuellsten Arbeiten.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestReferences.length > 0 ? (
                latestReferences.map(ref => (
                    <motion.div
                        key={ref.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                    >
                        <Link href={`/referenzen/${ref.slug}`} className="group flex h-full">
                            <Card className="overflow-hidden h-full w-full transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10">
                                <CardHeader className="p-0 relative">
                                    <div className="aspect-video overflow-hidden">
                                        <Image
                                            unoptimized
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
                                    <p className="text-sm text-muted-foreground line-clamp-2">{ref.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center">Aktuell werden die neusten Projekte geladen oder es sind keine Projekte vorhanden.</p>
              )}
            </div>
            <div className="mt-12 text-center">
                <CtaButton variant="outline" asChild>
                    <Link href="/referenzen">Alle Projekte ansehen</Link>
                </CtaButton>
            </div>
        </motion.section>
    );
}
