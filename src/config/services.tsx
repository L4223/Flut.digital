import {
  BrainCircuit,
  Code,
  SwatchBook,
  Bot,
  Server,
  Handshake,
  LucideIcon,
} from "lucide-react";
import React from "react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  category: string;
  Icon: LucideIcon;
  features: string[];
  details: React.ReactNode;
};

export const services: Service[] = [
  {
    slug: "web",
    title: "Webentwicklung",
    description:
      "Maßgeschneiderte Webanwendungen und Websites, die performant, skalierbar und benutzerfreundlich sind.",
    category: "Entwicklung",
    Icon: Code,
    features: [
      "Headless CMS",
      "E-Commerce-Lösungen",
      "Progressive Web Apps (PWA)",
      "Performance-Optimierung",
    ],
    details: (
      <>
        <div className="text-xl font-semibold mb-2 text-foreground">
          Moderne Web-Architekturen
        </div>
        <p>
          Wir setzen auf moderne Technologien wie Next.js und serverlose
          Architekturen, um blitzschnelle und robuste Web-Erlebnisse zu
          schaffen. Ob Corporate Website, E-Commerce-Plattform oder komplexe
          Webanwendung – wir liefern Qualität.
        </p>
        <div className="text-xl font-semibold mt-6 mb-2 text-foreground">
          Fokus auf User Experience
        </div>
        <p>
          Ein gutes Design ist mehr als nur Ästhetik. Wir legen größten Wert auf
          eine intuitive Benutzerführung und Barrierefreiheit, um
          sicherzustellen, dass Ihre Zielgruppe die bestmögliche Erfahrung hat.
        </p>
      </>
    ),
  },
  {
    slug: "branding",
    title: "Branding & Design",
    description:
      "Einzigartige Markenidentitäten und digitales Design, das Ihre Geschichte erzählt und im Gedächtnis bleibt.",
    category: "Design",
    Icon: SwatchBook,
    features: [
      "Corporate Identity",
      "UI/UX Design",
      "Design Systeme",
      "Logo-Entwicklung",
    ],
    details: (
      <>
        <div className="text-xl font-semibold mb-2 text-foreground">
          Strategische Markenbildung
        </div>
        <p>
          Ihre Marke ist Ihr wichtigstes Gut. Wir helfen Ihnen, eine starke,
          kohärente Markenidentität zu entwickeln, die Ihre Werte kommuniziert
          und eine emotionale Verbindung zu Ihrer Zielgruppe aufbaut.
        </p>
        <div className="text-xl font-semibold mt-6 mb-2 text-foreground">
          Digital First Design
        </div>
        <p>
          Unsere Designs sind für die digitale Welt optimiert. Wir erstellen
          intuitive Benutzeroberflächen (UI) und durchdachte Nutzererlebnisse
          (UX), die auf allen Geräten funktionieren und Ihre Nutzer begeistern.
        </p>
      </>
    ),
  },
  {
    slug: "3d-ar",
    title: "3D & AR Entwicklung",
    description:
      "Immersive 3D-Visualisierungen und Augmented-Reality-Anwendungen, die die Grenzen der Realität erweitern.",
    category: "Innovation",
    Icon: BrainCircuit,
    features: [
      "Interaktive 3D-Modelle",
      "Web-basierte AR-Erlebnisse",
      "Produktkonfiguratoren",
      "Virtuelle Showrooms",
    ],
    details: (
      <>
        <div className="text-xl font-semibold mb-2 text-foreground">
          Interaktion in der dritten Dimension
        </div>
        <p>
          Mit Technologien wie Three.js und WebGL bringen wir Ihre Produkte und
          Ideen in die dritte Dimension. Erschaffen Sie interaktive Erlebnisse,
          die Ihre Kunden direkt im Browser erkunden können.
        </p>
      </>
    ),
  },
  {
    slug: "ki",
    title: "KI-Lösungen",
    description:
      "Intelligente Automatisierung und datengestützte Einblicke durch maßgeschneiderte KI-Integrationen.",
    category: "Innovation",
    Icon: Bot,
    features: [
      "Chatbots & Virtuelle Assistenten",
      "Automatisierte Prozesse",
      "Datenanalyse & Prognosen",
      "Integration von LLMs",
    ],
    details: (
      <>
        <div className="text-xl font-semibold mb-2 text-foreground">
          Intelligenz für Ihr Business
        </div>
        <p>
          Nutzen Sie das Potenzial von künstlicher Intelligenz. Wir entwickeln
          und integrieren KI-Modelle, die Ihre Prozesse optimieren,
          Kundenservice automatisieren oder völlig neue Geschäftsmodelle
          ermöglichen.
        </p>
      </>
    ),
  },
  {
    slug: "social",
    title: "Social Media",
    description:
      "Strategische Social-Media-Kampagnen, die Ihre Marke wachsen lassen und Ihre Community aktivieren.",
    category: "Marketing",
    Icon: Handshake,
    features: [
      "Content-Strategie",
      "Community Management",
      "Performance Marketing",
      "Influencer-Kooperationen",
    ],
    details: (
      <>
        <div className="text-xl font-semibold mb-2 text-foreground">
          Authentische Verbindungen
        </div>
        <p>
          Wir helfen Ihnen, auf den richtigen Plattformen eine authentische
          Stimme zu finden und eine engagierte Community aufzubauen. Von der
          Strategie bis zur Umsetzung Ihrer Social-Media-Präsenz.
        </p>
      </>
    ),
  },
  // {
  //     slug: "schulung",
  //     title: "IT-Schulungen",
  //     description: "Praxisnahe Trainings und Workshops, um Ihr Team fit für die digitalen Herausforderungen der Zukunft zu machen.",
  //     category: "Wissenstransfer",
  //     Icon: Server,
  //     features: ["Next.js & React Workshops", "DevOps für Entwickler", "KI-Grundlagen für Teams", "Individuelle Firmenschulungen"],
  //     details: (
  //         <>
  //             <div className="text-xl font-semibold mb-2 text-foreground">Wissen, das weiterbringt</div>
  //             <p>
  //                 Investieren Sie in die Fähigkeiten Ihres Teams. Unsere Experten vermitteln praxisrelevantes Wissen in maßgeschneiderten Schulungen zu den modernsten Technologien und Methoden der Softwareentwicklung.
  //             </p>
  //         </>
  //     )
  // }
];
