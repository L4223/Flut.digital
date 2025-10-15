
"use client"
import Image from "next/image";
import { Check, Zap, Target } from "lucide-react";
import CtaButton from "@/components/cta-button";
import Link from "next/link";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Lasse Knodt",
    role: "CEO & Lead Developer",
    imageUrl: "https://s3.eu-north-1.amazonaws.com/flut.digital1/profilbild.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4AQ3ULQFIYIRMPI6%2F20251007%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20251007T150406Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCmV1LW5vcnRoLTEiSDBGAiEA%2BKK2dTD7HuRKnXew12h99qmcmcUhDjA%2FdwK%2FpsaKciACIQCmx9ipyxvPiQy1vZF4z%2FVwkhtPQmYOOENVD77bWAJm4irjAgio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDgyNTc2NTQyMDA0MiIM%2BbtIgQGfVAclzI1yKrcCeUPxIakpxCcTrArAs0LnNowXjCt3VPB0gDGu3c5w68RMFoIVAbkbQLA7zUnDms7e9CItbsiNha2pI0M4CMuYM2MrlU5aOcP6YxUBfsuhmpEYagZbc%2FxhyOOXgJfIyJn1gIUj95whdUj9I49p%2FZiQnnY97J0zzh%2Bm%2FN1Nv7RHwEcYt035E5283ddn6O3O8A6DiMsULU7ZfOjes2f8AG4hInKKza5vweB%2FMGjpENXdjxtywahep2%2BGjGT9zvAcYYJ6atwYFHzSPkYf9MmSJsKsqHRwW92ZM6jw0OqSpEGwfq58YHC8l7Vt0LRpunyA90BlbaI8hO9ULLv%2FiwrGuqJl10WsH8ido%2B4n1xu4axexhtYSaPoit%2FguhuAh45%2F8M8kBxfKpEZ4IEF1aQWeuPVWVOKTCpOUv9kswitSUxwY6rAKoJbAU%2BCg5bVpt7KrxdpoM2zOIIpx3Y39nJz3rb2FURLjw74p4N97qP4sWdtOcwyusCUQy3LHVqGLG0GaVrIGoBCgW9cP1mudtzaNiuZKu24cue5UZRUdJzMYRdMyS%2BU1R%2BwrGlF3wGBOfVxYWHQZYMpKGyZr0K0eyCUff9FiG2vAI%2FbrbE3yrxOSydmB%2F43ni7BIkIPaqZvog3VWWG%2FhgwLdZXwDjZwXksPfYWoeKo5ZYf1SGqAagSk6Mj8%2FCm6v22NB0NS%2FbLq3q53bUlB6BbbU85LvHYBIX6tZmFKvMr0Lr0Q8QE2ED80E4J2kSzLZkXj4suOKLhJV4FtyTvHlYdel5PEi%2BlmM9pvhcteLYyNDXYnZNpz3eNBEj6mnTaWv4dMvIrOUo3a5%2BNsw%3D&X-Amz-Signature=5d3ba97b4dfc45af37b900c98c571309285cee407f93050e401d6201c83e1514&X-Amz-SignedHeaders=host&response-content-disposition=inline",
    imageHint: "professional portrait"
  },
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
    <div className="container mx-auto px-8 py-16 md:py-24 space-y-24 md:space-y-32">
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
