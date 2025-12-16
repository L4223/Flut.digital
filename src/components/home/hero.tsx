
"use client"

import CtaButton from "@/components/cta-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-[80vh] min-h-[500px] md:h-screen flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background to-background" />
            
            <div className="relative z-10 container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-10 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground leading-tight md:leading-tight lg:leading-snug">
                        Digitale Lösungen,<br />die begeistern.
                    </h1>
                    <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-xl text-muted-foreground mb-10">
                        Wir sind Ihre Digitalagentur für anspruchsvolles Webdesign, zukunftsweisende KI-Integrationen und immersive 3D/AR-Erlebnisse.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <CtaButton asChild size="lg" className="flex-shrink-0">
                            <Link href="/kontakt" className="flex items-center whitespace-nowrap">
                                <span>Projekt starten</span>
                                <ArrowRight className="ml-2"/>
                            </Link>
                        </CtaButton>
                        <Link href="/leistungen" className="font-semibold hover:text-primary transition-colors">
                            Unsere Leistungen entdecken
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
