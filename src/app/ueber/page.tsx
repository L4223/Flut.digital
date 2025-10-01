
"use client"
import Image from "next/image";
import { Check, Zap, Target } from "lucide-react";
import CtaButton from "@/components/cta-button";
import Link from "next/link";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Max Mustermann",
    role: "CEO & Lead Developer",
    imageUrl: "https://picsum.photos/seed/team1/400/400",
    imageHint: "professional portrait"
  },
  {
    name: "Erika Mustermann",
    role: "Creative Director",
    imageUrl: "https://picsum.photos/seed/team2/400/400",
    imageHint: "creative professional"
  }
]

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

export default function UeberPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
      <motion.header 
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Wir sind Flut.digital</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Eine Digitalagentur, die an der Schnittstelle von Design, Technologie und Strategie agiert, um außergewöhnliche digitale Erlebnisse zu schaffen.
        </p>
      </motion.header>

      <motion.div 
        className="grid md:grid-cols-3 gap-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div variants={cardVariants} className="p-8 bg-secondary/50 rounded-lg">
          <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Unsere Mission</h3>
          <p className="text-muted-foreground">Innovative Lösungen entwickeln, die echten Mehrwert schaffen und unsere Kunden im digitalen Zeitalter voranbringen.</p>
        </motion.div>
        <motion.div variants={cardVariants} className="p-8 bg-secondary/50 rounded-lg">
          <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Unsere Vision</h3>
          <p className="text-muted-foreground">Die führende Agentur für anspruchsvolle digitale Transformationen zu sein, die für Qualität und Kreativität bekannt ist.</p>
        </motion.div>
        <motion.div variants={cardVariants} className="p-8 bg-secondary/50 rounded-lg">
          <Check className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Unsere Werte</h3>
          <p className="text-muted-foreground">Partnerschaft, Transparenz, Exzellenz und eine unstillbare Neugier treiben uns jeden Tag an.</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">Das Team</h2>
        <div className="flex justify-center gap-8 md:gap-16">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={400}
                  height={400}
                  data-ai-hint={member.imageHint}
                  className="rounded-full object-cover w-full h-full border-4 border-primary/50"
                />
              </div>
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

       <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
       >
          <h2 className="text-3xl font-bold mb-4">Interesse an einer Zusammenarbeit?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Wir sind immer auf der Suche nach neuen Herausforderungen und spannenden Projekten.</p>
          <CtaButton asChild size="lg">
              <Link href="/kontakt">
                  Lassen Sie uns reden
              </Link>
          </CtaButton>
      </motion.div>

    </div>
  );
}
