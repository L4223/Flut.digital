import { BrainCircuit, Code, SwatchBook, Bot, Server, Handshake } from "lucide-react";

const technologies = [
  { name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Node.js" },
  { name: "Python" }, { name: "Firebase" }, { name: "Docker" }, { name: "Google Cloud" },
  { name: "Three.js" }, { name: "TensorFlow" }
];

export default function TechStackSection() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Technologien, die wir lieben
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          Wir nutzen ein modernes, flexibles Tech-Stack, um zukunftssichere Anwendungen zu bauen.
        </p>
      </div>
      <div className="relative">
        <div className="flex justify-center flex-wrap gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="py-2 px-5 rounded-full bg-secondary border text-md font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/50">
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
