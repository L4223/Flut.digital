
"use client"
import { services } from "@/config/services";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LeistungenPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.header 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Unsere Leistungen</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Wir bieten ein umfassendes Spektrum an digitalen Dienstleistungen, um Ihre Visionen Wirklichkeit werden zu lassen.
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
        {services.map((service) => {
          const { Icon } = service;
          return (
            <motion.div
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <Link href={`/leistungen/${service.slug}`} className="group h-full flex">
                <Card className="w-full h-full bg-secondary/50 border-0 transition-all duration-300 hover:bg-secondary hover:-translate-y-2">
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
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
