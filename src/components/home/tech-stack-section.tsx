
"use client"
import { BrainCircuit, Code, SwatchBook, Bot, Server, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Node.js" },
  { name: "Python" }, { name: "Firebase" }, { name: "Docker" }, { name: "Google Cloud" },
  { name: "Three.js" }, { name: "TensorFlow" }
];

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export default function TechStackSection() {
  return (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Technologien, die wir lieben
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          Wir nutzen einen modernen, flexiblen Tech-Stack, um zukunftssichere Anwendungen zu bauen.
        </p>
      </div>
      <div className="relative">
        <div className="flex justify-center flex-wrap gap-4">
          {technologies.map((tech, index) => (
            <motion.div 
              key={index} 
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 1 }}
              variants={badgeVariants}
              className="py-2 px-5 rounded-full bg-secondary border text-md font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/50">
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
