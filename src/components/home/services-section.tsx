"use client"
import Link from "next/link";
import { services } from "@/config/services";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CtaButton from "../cta-button";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

export default function ServicesSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Unsere Kernkompetenzen
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          Wir verwandeln komplexe Herausforderungen in elegante, digitale Lösungen.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.slice(0, 3).map((service, i) => {
          const { Icon } = service;
          return (
            <motion.div
              key={service.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Link href={`/leistungen/${service.slug}`} className="group h-full flex">
                <Card className="w-full bg-secondary/50 border-0 transition-all duration-300 hover:bg-secondary motion-safe:hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-background rounded-lg border">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
       <div className="mt-12 text-center">
            <CtaButton variant="outline" asChild>
                <Link href="/leistungen">Alle Leistungen ansehen</Link>
            </CtaButton>
        </div>
    </motion.section>
  );
}
