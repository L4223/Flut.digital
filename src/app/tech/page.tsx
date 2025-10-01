
"use client"
import { Card } from "@/components/ui/card";
import { 
  Code, 
  Database, 
  Layers, 
  Cloud, 
  Cpu, 
  Palette
} from "lucide-react";
import { motion } from "framer-motion";

const techCategories = [
  {
    name: "Frontend",
    icon: Palette,
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"]
  },
  {
    name: "Backend",
    icon: Code,
    stack: ["Node.js", "Python", "Go", "Firebase Functions"]
  },
  {
    name: "Datenbanken",
    icon: Database,
    stack: ["Firestore", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    name: "KI & Machine Learning",
    icon: Cpu,
    stack: ["TensorFlow", "PyTorch", "Google AI Platform", "OpenAI"]
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    stack: ["Docker", "Kubernetes", "Google Cloud", "Vercel", "Firebase"]
  },
  {
    name: "CMS & Tools",
    icon: Layers,
    stack: ["Sanity", "Contentful", "Strapi", "Storybook", "Figma"]
  }
]

export default function TechPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.header 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Unser Tech-Stack</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Wir setzen auf moderne, skalierbare und bewährte Technologien, um erstklassige digitale Produkte zu entwickeln.
        </p>
      </motion.header>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
        {techCategories.map((category) => (
          <motion.div
            key={category.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <Card className="p-6 bg-secondary/50 border-0 h-full">
              <div className="flex items-center gap-4 mb-4">
                <category.icon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.stack.map((tech) => (
                  <div key={tech} className="py-1 px-3 rounded-full bg-background border text-sm text-muted-foreground">
                    {tech}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
