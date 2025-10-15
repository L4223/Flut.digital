
"use client"
import CtaButton from "@/components/cta-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
    return (
        <motion.section 
            className="relative overflow-hidden rounded-2xl p-8 md:p-16 border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="absolute inset-0 radial-glow -z-10 opacity-50"/>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                    Bereit, Ihre Idee umzusetzen?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen mit einer maßgeschneiderten digitalen Lösung voranbringen können.
                </p>

                <CtaButton asChild size="lg">
                    <Link href="/kontakt">
                        Projekt starten
                        <ArrowRight className="ml-2"/>
                    </Link>
                </CtaButton>
            </div>
        </motion.section>
    );
}
