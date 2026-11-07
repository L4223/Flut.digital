import { Monitor, Box, BrainCircuit, Database, Cloud, type LucideIcon } from "lucide-react";

export type Tech = { name: string; what: string };

export type TechLayer = {
  id: string;
  /** Plain-language layer name, e.g. "Was Ihre Besucher sehen". */
  label: string;
  /** Technical name of the layer. */
  name: string;
  /** What the layer means for the client. */
  benefit: string;
  icon: LucideIcon;
  stack: Tech[];
};

export const techLayers: TechLayer[] = [
  {
    id: "frontend",
    label: "Was Ihre Besucher sehen",
    name: "Oberfläche",
    benefit: "Schnelle Ladezeiten, gute Auffindbarkeit bei Google und eine Darstellung, die auf jedem Gerät funktioniert.",
    icon: Monitor,
    stack: [
      { name: "Next.js", what: "Das Fundament moderner Websites: lädt schnell und ist für Suchmaschinen optimiert." },
      { name: "React", what: "Baukasten für interaktive Oberflächen, der von Millionen Entwickler:innen genutzt wird." },
      { name: "TypeScript", what: "JavaScript mit Typprüfung – findet Fehler, bevor Ihre Nutzer sie sehen." },
      { name: "Tailwind CSS", what: "Einheitliches Design-System für konsistente, saubere Gestaltung." },
      { name: "Framer Motion", what: "Flüssige Animationen, die sich zurücknehmen, wenn Nutzer weniger Bewegung wünschen." },
    ],
  },
  {
    id: "3d",
    label: "Was begeistert",
    name: "3D & Augmented Reality",
    benefit: "3D-Modelle und AR-Erlebnisse direkt im Browser – ohne App-Download.",
    icon: Box,
    stack: [
      { name: "Three.js", what: "3D-Grafik im Browser, z. B. für interaktive Produktansichten oder Animationen." },
      { name: "model-viewer", what: "Zeigt 3D-Modelle an und stellt sie per Fingertipp in die echte Umgebung." },
      { name: "WebXR", what: "Web-Standard für AR und VR – funktioniert auf aktuellen Smartphones." },
    ],
  },
  {
    id: "ai",
    label: "Was mitdenkt",
    name: "Künstliche Intelligenz",
    benefit: "Chatbots, automatisierte Abläufe und Auswertungen, die Ihrem Team Arbeit abnehmen.",
    icon: BrainCircuit,
    stack: [
      { name: "Groq", what: "Sehr schnelle Ausführung offener Sprachmodelle wie Llama – z. B. für den Chat auf dieser Website." },
      { name: "Google Gemini", what: "Sprachmodelle von Google für Texte, Analysen und Assistenten." },
      { name: "OpenAI", what: "Weitere leistungsstarke Sprachmodelle – wir wählen das passende für Ihren Fall." },
      { name: "TensorFlow & PyTorch", what: "Für eigene Machine-Learning-Modelle, wenn Standard-KI nicht reicht." },
    ],
  },
  {
    id: "backend",
    label: "Was im Hintergrund arbeitet",
    name: "Daten & Server",
    benefit: "Logins, Formulare, Inhalte und Daten – sicher gespeichert und schnell abrufbar.",
    icon: Database,
    stack: [
      { name: "Node.js", what: "Server-Logik in JavaScript – schnell und weit verbreitet." },
      { name: "Python", what: "Erste Wahl für Datenverarbeitung und KI-Anwendungen." },
      { name: "Firebase", what: "Datenbank, Anmeldung und Datei-Speicher von Google – ideal für Web-Apps." },
      { name: "PostgreSQL", what: "Bewährte Datenbank für strukturierte Daten wie Kunden oder Bestellungen." },
      { name: "Redis", what: "Sehr schneller Speicher für Inhalte, die oft abgerufen werden." },
    ],
  },
  {
    id: "infra",
    label: "Wo alles läuft",
    name: "Hosting & Cloud",
    benefit: "Zuverlässiger Betrieb, der mit Ihren Besucherzahlen mitwächst.",
    icon: Cloud,
    stack: [
      { name: "Vercel", what: "Hosting für Next.js-Seiten mit weltweitem Netzwerk für kurze Ladezeiten." },
      { name: "Google Cloud", what: "Skalierbare Infrastruktur für größere Anwendungen und KI-Dienste." },
      { name: "Docker", what: "Verpackt Anwendungen so, dass sie überall gleich zuverlässig laufen." },
    ],
  },
];

/** Tools we use while building – the "KI im Prozess" part. */
export const aiWorkflowTools: Tech[] = [
  { name: "KI-Coding-Assistenten", what: "z. B. Claude Code: schreiben Routinecode und Tests und prüfen Änderungen – jede Zeile wird von uns abgenommen." },
  { name: "KI-Prototyping", what: "z. B. Firebase Studio mit Gemini: aus einer Idee wird schnell ein klickbarer Prototyp." },
  { name: "Automatisierte Audits", what: "Prüfen Barrierefreiheit, Performance und SEO, bevor ein Projekt live geht." },
  { name: "Recherche & Konzeption", what: "KI hilft, Anforderungen zu strukturieren und Wettbewerber zu analysieren." },
];
