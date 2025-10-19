
"use client"
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Reference } from "@/config/references";

export default function ReferenzenPage() {
  const [references, setReferences] = useState<Reference[]>([]);

  useEffect(() => {
    const fetchReferences = async () => {
      if (!db) return;
      const querySnapshot = await getDocs(collection(db, "references"));
      const refsData = querySnapshot.docs.map(doc => doc.data() as Reference);
      setReferences(refsData);
    };
    fetchReferences();
  }, []);

  return (
    <div className="container mx-auto px-8 py-16 md:py-24">
      <motion.header 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Unsere Referenzen</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Ein Auszug unserer Arbeit, der für sich spricht. Wir sind stolz auf jedes einzelne Projekt.
        </p>
      </motion.header>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {references.map((ref) => (
          <motion.div
            key={ref.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="h-full"
          >
            <Link href={`/referenzen/${ref.slug}`} className="group h-full flex">
              <Card className="w-full h-full overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10">
                <CardHeader className="p-0 relative">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      unoptimized
                      src={ref.imageUrl}
                      alt={ref.title}
                      width={600}
                      height={400}
                      data-ai-hint={ref.imageHint}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                      <Badge>{ref.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{ref.title}</h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
