
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
    const [latestReference, setLatestReference] = useState<ReferenceWithId | null>(null);

    useEffect(() => {
        const fetchReferences = async () => {
            if (!db) return;
            // Query for the latest reference based on createdAt timestamp
            const q = query(collection(db, "references"), orderBy("createdAt", "desc"), limit(1));
            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const refData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as ReferenceWithId;
                    setLatestReference(refData);
                } else {
                    // Fallback: If no document has 'createdAt', just get one document
                    const fallbackQuery = query(collection(db, "references"), limit(1));
                    const fallbackSnapshot = await getDocs(fallbackQuery);
                    if(!fallbackSnapshot.empty){
                        const refData = { id: fallbackSnapshot.docs[0].id, ...fallbackSnapshot.docs[0].data() } as ReferenceWithId;
                        setLatestReference(refData);
                    }
                }
            } catch (error) {
                console.error("Error fetching latest reference, trying fallback:", error);
                // Fallback in case of error (e.g. index not ready)
                const fallbackQuery = query(collection(db, "references"), limit(1));
                const fallbackSnapshot = await getDocs(fallbackQuery);
                if(!fallbackSnapshot.empty){
                    const refData = { id: fallbackSnapshot.docs[0].id, ...fallbackSnapshot.docs[0].data() } as ReferenceWithId;
                    setLatestReference(refData);
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
                    Neustes Projekt
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                    Werfen Sie einen Blick auf unsere aktuellste Arbeit.
                </p>
            </div>
            
            <div className="flex justify-center">
              {latestReference ? (
                <div className="w-full max-w-md">
                    <Link href={`/referenzen/${latestReference.slug}`} className="group flex h-full">
                        <Card className="overflow-hidden h-full w-full transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10">
                            <CardHeader className="p-0 relative">
                                <div className="aspect-video overflow-hidden">
                                     <Image
                                        src={latestReference.imageUrl}
                                        alt={latestReference.title}
                                        width={600}
                                        height={400}
                                        data-ai-hint={latestReference.imageHint}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Badge>{latestReference.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold truncate">{latestReference.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{latestReference.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
              ) : (
                <p className="text-muted-foreground">Aktuell wird das neuste Projekt geladen oder es sind keine Projekte vorhanden.</p>
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
