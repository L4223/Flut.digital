import {
  Accessibility,
  BarChart3,
  Blocks,
  Bot,
  Box,
  BrainCircuit,
  CalendarDays,
  Camera,
  Code,
  FileSearch,
  Gauge,
  Glasses,
  Handshake,
  Layers,
  LayoutTemplate,
  Megaphone,
  MessagesSquare,
  Palette,
  PenTool,
  Plug,
  Rotate3d,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  SwatchBook,
  TrendingUp,
  Type,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceOffering = { title: string; text: string; Icon: LucideIcon };
export type ServiceStep = { title: string; text: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  description: string;
  category: string;
  Icon: LucideIcon;
  /** Short list used on the homepage cards and in the hero chips. */
  features: string[];
  /** Section heading + paragraphs explaining the service. */
  intro: { heading: string; paragraphs: string[] };
  /** What the client concretely gets out of it. */
  outcomes: string[];
  /** Building blocks of the service. */
  offerings: ServiceOffering[];
  /** Typical project examples. */
  useCases: { title: string; text: string }[];
  /** Service-specific project steps. */
  process: ServiceStep[];
  /** How AI is used within this discipline. */
  aiNote: string;
  stack: string[];
  faq: ServiceFaq[];
  /** Slugs of matching case studies in src/config/references.tsx. */
  references: string[];
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
    intro: {
      heading: "Websites, die schnell laden und sich selbst pflegen lassen",
      paragraphs: [
        "Wir bauen Websites und Web-Apps mit Next.js und modernen, serverlosen Architekturen. Das Ergebnis lädt in Sekundenbruchteilen, wird von Google gut gefunden und wächst mit, wenn Ihr Unternehmen wächst.",
        "Dabei denken wir vom Alltag aus: Inhalte wie Öffnungszeiten, Angebote oder News pflegen Sie selbst in einem einfachen Admin-Bereich – ohne Technikwissen und ohne für jede Änderung eine Agentur anrufen zu müssen.",
      ],
    },
    outcomes: [
      "Kurze Ladezeiten und gute Core-Web-Vitals",
      "Inhalte selbst pflegen, ohne Code",
      "Auf Smartphone, Tablet und Desktop sauber dargestellt",
      "Barrierearm und suchmaschinenfreundlich gebaut",
    ],
    offerings: [
      {
        Icon: LayoutTemplate,
        title: "Unternehmenswebsites",
        text: "Individuell gestaltete Websites statt Baukasten-Vorlage – passend zu Ihrer Marke und Ihren Zielen.",
      },
      {
        Icon: Blocks,
        title: "Web-Apps & Portale",
        text: "Buchungstools, Kundenportale, Dashboards: Anwendungen, die Abläufe vereinfachen und direkt im Browser laufen.",
      },
      {
        Icon: PenTool,
        title: "CMS & Admin-Bereiche",
        text: "Ein Headless CMS oder ein schlanker, maßgeschneiderter Admin – so einfach, dass Ihr Team ihn wirklich nutzt.",
      },
      {
        Icon: ShoppingCart,
        title: "E-Commerce",
        text: "Shops und Bestellstrecken mit sicheren Zahlungsanbietern, von der kleinen Produktauswahl bis zum Katalog.",
      },
      {
        Icon: Gauge,
        title: "Performance & SEO",
        text: "Wir messen, wo Ihre bestehende Seite Zeit und Besucher verliert, und beheben es gezielt.",
      },
      {
        Icon: Accessibility,
        title: "Barrierefreiheit",
        text: "Gut lesbar, per Tastatur bedienbar und mit Screenreadern nutzbar – im Hinblick auf das Barrierefreiheitsstärkungsgesetz.",
      },
    ],
    useCases: [
      {
        title: "Neue Website für ein lokales Unternehmen",
        text: "Ein Café, eine Praxis, ein Handwerksbetrieb: klare Informationen, aktueller Öffnungsstatus und Inhalte, die das Team selbst ändert.",
      },
      {
        title: "Relaunch einer veralteten Seite",
        text: "Langsame WordPress-Seite oder Baukasten am Limit? Wir übernehmen die Inhalte und bauen ein schnelles, wartbares Fundament.",
      },
      {
        title: "Interne Tools und Web-Apps",
        text: "Formulare, Auswertungen und Excel-Listen werden zu einer Web-App, die Ihre Abläufe tatsächlich abbildet.",
      },
    ],
    process: [
      { title: "Anforderungen klären", text: "Ziele, Zielgruppe, Inhalte und Funktionen – kurz und konkret festgehalten." },
      { title: "Klickbarer Prototyp", text: "Statt statischer Entwürfe sehen Sie früh eine Version, die sich wie die fertige Seite anfühlt." },
      { title: "Entwicklung", text: "Umsetzung in kurzen Schritten mit regelmäßigen Zwischenständen zum Ausprobieren." },
      { title: "Launch & Betreuung", text: "Livegang, Einweisung in den Admin-Bereich und auf Wunsch laufende Wartung." },
    ],
    aiNote:
      "KI-Coding-Assistenten übernehmen bei uns Routinecode, Tests und erste Reviews. Dadurch bleibt mehr Zeit für Gestaltung, Details und Qualitätssicherung – jede Zeile wird von uns geprüft.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase", "Vercel"],
    faq: [
      {
        q: "Was kostet eine Website?",
        a: "Das hängt vom Umfang ab. Eine kompakte Unternehmenswebsite ist deutlich günstiger als eine Web-App mit Benutzerkonten. Nach einem kostenlosen Erstgespräch bekommen Sie ein transparentes Festpreisangebot.",
      },
      {
        q: "Wie lange dauert die Umsetzung?",
        a: "Kleinere Websites sind oft in wenigen Wochen online. Größere Anwendungen planen wir in Etappen, sodass erste Teile früh nutzbar sind.",
      },
      {
        q: "Kann ich Inhalte später selbst ändern?",
        a: "Ja. Jede Website bekommt auf Wunsch einen Admin-Bereich, in dem Sie Texte, Bilder und Termine ohne Programmierkenntnisse bearbeiten.",
      },
      {
        q: "Übernehmt ihr auch Hosting und Wartung?",
        a: "Ja. Wir richten Hosting, Domain und SSL ein und kümmern uns auf Wunsch um Updates, Backups und kleine Anpassungen.",
      },
    ],
    references: ["bei-jost", "kiel-visionen"],
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
    intro: {
      heading: "Ein Auftritt, der nach Ihnen aussieht – nicht nach Vorlage",
      paragraphs: [
        "Ihre Marke ist mehr als ein Logo. Wir entwickeln ein stimmiges Gesamtbild aus Farben, Schrift, Bildsprache und Tonalität, das Ihre Werte transportiert und sich von Mitbewerbern abhebt.",
        "Weil wir auch entwickeln, gestalten wir digital zuerst: Jedes Element funktioniert auf dem Bildschirm, auf kleinen Displays und mit ausreichend Kontrast – und wird in einem Design-System festgehalten, das spätere Arbeit leichter macht.",
      ],
    },
    outcomes: [
      "Wiedererkennbarer, konsistenter Auftritt",
      "Logo und Farben in allen benötigten Formaten",
      "Gestaltungsregeln, an die sich alle halten können",
      "Oberflächen, die intuitiv bedienbar sind",
    ],
    offerings: [
      {
        Icon: PenTool,
        title: "Logo & Wortmarke",
        text: "Ein eigenständiges Zeichen mit Varianten für Website, Social Media, Druck und Favicon.",
      },
      {
        Icon: Palette,
        title: "Farb- & Bildwelt",
        text: "Eine Farbpalette mit geprüften Kontrasten und eine Bildsprache, die zu Ihrer Haltung passt.",
      },
      {
        Icon: Type,
        title: "Typografie",
        text: "Schriften, die lesbar sind, Charakter haben und auf allen Geräten zuverlässig laden.",
      },
      {
        Icon: Layers,
        title: "Design-Systeme",
        text: "Komponenten, Abstände und Regeln als Bibliothek – für einheitliche Ergebnisse, auch wenn das Team wächst.",
      },
      {
        Icon: Smartphone,
        title: "UI/UX-Design",
        text: "Durchdachte Nutzerführung für Websites und Apps, getestet an klickbaren Prototypen.",
      },
      {
        Icon: SwatchBook,
        title: "Brand Guidelines",
        text: "Ein kompaktes Handbuch, damit Druckerei, Agentur und Team Ihre Marke richtig einsetzen.",
      },
    ],
    useCases: [
      {
        title: "Neugründung",
        text: "Vom Namen über das Logo bis zur ersten Website: ein Auftritt, der von Anfang an professionell wirkt.",
      },
      {
        title: "Auffrischung einer bestehenden Marke",
        text: "Wir behalten, was wiedererkannt wird, und modernisieren, was in die Jahre gekommen ist.",
      },
      {
        title: "Design für eine digitale Anwendung",
        text: "Oberflächen für Web-Apps und Portale, die sich an Ihren Nutzern statt an Funktionen orientieren.",
      },
    ],
    process: [
      { title: "Markenkern", text: "Workshop zu Werten, Zielgruppe und Positionierung – was soll man über Sie denken?" },
      { title: "Richtungen", text: "Zwei bis drei klar unterschiedliche Gestaltungsansätze zur Auswahl." },
      { title: "Ausarbeitung", text: "Die gewählte Richtung wird verfeinert und auf echte Anwendungen übertragen." },
      { title: "Übergabe", text: "Alle Dateien, Guidelines und auf Wunsch das Design-System für die Entwicklung." },
    ],
    aiNote:
      "KI hilft uns bei Recherche, Moodboards und schnellen Varianten in der Ideenphase. Logo, Schrift und Gestaltung entstehen in Handarbeit – damit Ihre Marke eigenständig und rechtlich sauber bleibt.",
    stack: ["Figma", "Adobe Illustrator", "Tailwind CSS", "Design Tokens", "shadcn/ui"],
    faq: [
      {
        q: "Brauche ich gleich ein komplettes Corporate Design?",
        a: "Nicht unbedingt. Oft reichen zum Start Logo, Farben und Schriften. Das lässt sich später zu einem vollständigen Design-System ausbauen.",
      },
      {
        q: "Wie viele Entwürfe bekomme ich?",
        a: "Wir zeigen zu Beginn zwei bis drei klar unterschiedliche Richtungen und arbeiten die gewählte gemeinsam mit Ihnen aus. Korrekturschleifen sind im Angebot festgelegt.",
      },
      {
        q: "Bekomme ich alle Rechte und Dateien?",
        a: "Ja. Nach Abschluss erhalten Sie sämtliche Dateien in gängigen Formaten sowie die Nutzungsrechte für Ihre Marke.",
      },
      {
        q: "Könnt ihr das Design auch direkt umsetzen?",
        a: "Genau das ist unser Vorteil: Gestaltung und Entwicklung kommen aus einer Hand, ohne Reibungsverluste bei der Übergabe.",
      },
    ],
    references: ["bei-jost"],
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
    intro: {
      heading: "3D und Augmented Reality – direkt im Browser, ohne App",
      paragraphs: [
        "Mit Three.js, WebGL und WebXR bringen wir Produkte, Räume und Ideen in die dritte Dimension. Besucher drehen ein Modell mit dem Finger, schauen es sich von allen Seiten an oder stellen es per Augmented Reality in ihr eigenes Wohnzimmer.",
        "Der entscheidende Punkt: Alles läuft im Browser. Niemand muss eine App installieren, ein QR-Code oder Link genügt. Das senkt die Hürde enorm – für Kunden genauso wie für Schulen oder Beteiligungsprojekte.",
      ],
    },
    outcomes: [
      "Produkte erlebbar machen, bevor sie gekauft werden",
      "AR auf iOS und Android ohne App-Download",
      "Optimierte Modelle mit kurzen Ladezeiten",
      "Einbindung in bestehende Websites und Shops",
    ],
    offerings: [
      {
        Icon: Rotate3d,
        title: "Interaktive 3D-Viewer",
        text: "Modelle zum Drehen, Zoomen und Erkunden – mit Hotspots für Details und Erklärungen.",
      },
      {
        Icon: Glasses,
        title: "Web-AR-Erlebnisse",
        text: "Objekte per Smartphone in die reale Umgebung stellen, gestartet über Link oder QR-Code.",
      },
      {
        Icon: Box,
        title: "Produktkonfiguratoren",
        text: "Farben, Materialien und Varianten live im 3D-Modell wechseln – direkt mit Anfrage oder Warenkorb verbunden.",
      },
      {
        Icon: Camera,
        title: "Virtuelle Showrooms",
        text: "Räume und Ausstellungen, die man online begehen kann – rund um die Uhr geöffnet.",
      },
      {
        Icon: Layers,
        title: "3D-Aufbereitung",
        text: "Wir optimieren CAD-Daten, Scans oder vorhandene Modelle für eine schnelle Darstellung im Web.",
      },
      {
        Icon: Users,
        title: "Bildung & Beteiligung",
        text: "Lern- und Beteiligungsanwendungen, die abstrakte Inhalte anfassbar machen.",
      },
    ],
    useCases: [
      {
        title: "Möbel, Maschinen, Produkte",
        text: "Kunden sehen, wie groß ein Produkt wirklich ist und wie es im eigenen Raum wirkt – weniger Rückfragen und Retouren.",
      },
      {
        title: "Planung und Bürgerbeteiligung",
        text: "Ideen für Spielplätze, Plätze oder Gebäude werden vor Ort per AR sichtbar und für alle verständlich.",
      },
      {
        title: "Unterricht und Schulung",
        text: "3D-Modelle mit Erklärungen und Aufgaben – auf PC, Tablet und Smartphone, ohne spezielle Hardware.",
      },
    ],
    process: [
      { title: "Idee & Machbarkeit", text: "Was soll erlebbar werden, auf welchen Geräten, und welche 3D-Daten gibt es schon?" },
      { title: "Modelle & Prototyp", text: "Aufbereitung der Modelle und ein erster Prototyp zum Ausprobieren auf dem eigenen Handy." },
      { title: "Entwicklung", text: "Interaktion, Oberfläche und Anbindung an Website, Shop oder Datenbank." },
      { title: "Test & Launch", text: "Tests auf gängigen Geräten, Optimierung der Ladezeiten und Veröffentlichung." },
    ],
    aiNote:
      "KI unterstützt uns beim Strukturieren von Konzepten, beim Datenmodell und bei schnellen Prototypen. So lässt sich früh testen, ob eine AR-Idee im echten Einsatz funktioniert.",
    stack: ["Three.js", "WebGL", "WebXR", "model-viewer", "Blender", "React", "Firebase"],
    faq: [
      {
        q: "Brauchen meine Kunden eine App?",
        a: "Nein. Unsere 3D- und AR-Anwendungen laufen im Browser. Auf aktuellen iPhones und Android-Geräten startet AR mit einem Fingertipp.",
      },
      {
        q: "Wir haben keine 3D-Modelle. Ist das ein Problem?",
        a: "Nein. Wir können vorhandene CAD-Daten umwandeln, Modelle neu erstellen lassen oder auf passende Bibliotheken zurückgreifen.",
      },
      {
        q: "Wie schwer sind die Seiten? Laden die lange?",
        a: "Wir komprimieren Modelle und Texturen und laden sie erst, wenn sie gebraucht werden. Der Rest der Seite bleibt dadurch schnell.",
      },
      {
        q: "Funktioniert das auch auf älteren Geräten?",
        a: "Der 3D-Viewer läuft auf nahezu allen Geräten. Wo AR nicht unterstützt wird, zeigen wir automatisch die normale 3D-Ansicht.",
      },
    ],
    references: ["kiel-visionen", "schoolxr"],
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
    intro: {
      heading: "KI, die konkrete Arbeit abnimmt – nicht nur beeindruckt",
      paragraphs: [
        "Große Sprachmodelle können heute Anfragen beantworten, Dokumente zusammenfassen, Daten strukturieren und Texte entwerfen. Wir finden mit Ihnen heraus, wo das in Ihrem Alltag wirklich Zeit spart, und bauen genau dafür eine passende Lösung.",
        "Dabei bleiben wir pragmatisch: Wir starten mit einem klar umrissenen Anwendungsfall, messen das Ergebnis und bauen erst dann weiter aus. Datenschutz und die Frage, welche Daten an welchen Anbieter gehen, klären wir von Anfang an.",
      ],
    },
    outcomes: [
      "Weniger Routinearbeit im Team",
      "Antworten für Kunden rund um die Uhr",
      "Lösungen, die mit Ihren eigenen Daten arbeiten",
      "Transparenz darüber, wohin Daten fließen",
    ],
    offerings: [
      {
        Icon: MessagesSquare,
        title: "Chatbots & Assistenten",
        text: "Ein Assistent auf Ihrer Website, der Fragen zu Angeboten, Preisen oder Abläufen beantwortet – in Ihrem Ton.",
      },
      {
        Icon: FileSearch,
        title: "Wissensdatenbanken (RAG)",
        text: "KI, die in Ihren eigenen Dokumenten, Handbüchern und FAQs nachschlägt und mit Quellen antwortet.",
      },
      {
        Icon: Workflow,
        title: "Prozessautomatisierung",
        text: "E-Mails sortieren, Formulare auswerten, Daten übertragen: wiederkehrende Aufgaben laufen automatisch.",
      },
      {
        Icon: Plug,
        title: "LLM-Integration",
        text: "Sprachmodelle wie GPT, Claude, Gemini oder Open-Source-Modelle sicher in Ihre Software einbinden.",
      },
      {
        Icon: BarChart3,
        title: "Datenanalyse",
        text: "Auswertungen und Zusammenfassungen aus Umfragen, Feedback oder Verkaufsdaten – verständlich aufbereitet.",
      },
      {
        Icon: ShieldCheck,
        title: "Beratung & Datenschutz",
        text: "Welche Tools sind sinnvoll, welche Daten dürfen wohin? Wir schaffen Klarheit, bevor Sie investieren.",
      },
    ],
    useCases: [
      {
        title: "Website-Assistent für Kundenfragen",
        text: "Häufige Fragen zu Leistungen, Öffnungszeiten oder Preisen werden sofort beantwortet – komplexe Anliegen landen beim Team.",
      },
      {
        title: "Interne Wissenssuche",
        text: "Mitarbeitende fragen in normaler Sprache und finden die Antwort in Handbüchern, Verträgen oder Protokollen.",
      },
      {
        title: "Automatische Auswertung von Eingaben",
        text: "Ideen, Anfragen oder Rückmeldungen werden zusammengefasst, kategorisiert und übersichtlich dargestellt.",
      },
    ],
    process: [
      { title: "Use Case finden", text: "Gemeinsam identifizieren wir Aufgaben, bei denen KI messbar Zeit oder Kosten spart." },
      { title: "Proof of Concept", text: "Ein schneller Prototyp mit echten Beispieldaten zeigt, wie gut die Lösung funktioniert." },
      { title: "Integration", text: "Einbindung in Website, Tools und Abläufe – mit Schutz vor falschen oder unpassenden Antworten." },
      { title: "Betrieb & Verbesserung", text: "Wir beobachten Qualität und Kosten und verbessern die Lösung anhand echter Nutzung." },
    ],
    aiNote:
      "Wir setzen KI selbst täglich ein – in Konzeption, Entwicklung und Tests. Diese Praxiserfahrung fließt direkt in Ihre Lösung: Wir wissen, wo Modelle glänzen und wo sie Grenzen haben.",
    stack: ["OpenAI", "Anthropic Claude", "Google Gemini", "Groq", "Genkit", "Vektordatenbanken", "Next.js"],
    faq: [
      {
        q: "Ist KI für ein kleines Unternehmen überhaupt sinnvoll?",
        a: "Oft gerade dann. Schon ein Website-Assistent oder eine automatisierte E-Mail-Sortierung kann mehrere Stunden pro Woche sparen. Wir starten bewusst klein.",
      },
      {
        q: "Was passiert mit unseren Daten?",
        a: "Wir klären vorab, welche Daten verarbeitet werden, und wählen Anbieter mit passenden Datenschutzbedingungen – auf Wunsch mit Servern in der EU oder Open-Source-Modellen.",
      },
      {
        q: "Was, wenn die KI falsche Antworten gibt?",
        a: "Wir begrenzen den Assistenten auf geprüfte Inhalte, lassen ihn Quellen nennen und leiten unklare Fälle an einen Menschen weiter.",
      },
      {
        q: "Welche laufenden Kosten entstehen?",
        a: "Die Modell-Anbieter rechnen nach Nutzung ab. Wir schätzen die Kosten vorab realistisch ein und wählen das Modell, das zum Anwendungsfall passt.",
      },
    ],
    references: ["kiel-visionen"],
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
    intro: {
      heading: "Präsenz, die zu Ihnen passt und Ergebnisse bringt",
      paragraphs: [
        "Nicht jedes Unternehmen muss auf jeder Plattform sein. Wir finden heraus, wo Ihre Zielgruppe tatsächlich unterwegs ist, und entwickeln eine Strategie, die realistisch zu Ihren Ressourcen passt.",
        "Von der Content-Planung über Gestaltung und Text bis zu bezahlten Kampagnen: Wir helfen Ihnen, eine authentische Stimme zu finden, regelmäßig sichtbar zu sein und aus Followern Kunden zu machen.",
      ],
    },
    outcomes: [
      "Klare Strategie statt Posten nach Gefühl",
      "Einheitlicher Look passend zur Marke",
      "Regelmäßige Inhalte ohne Dauerstress",
      "Messbare Ergebnisse und klare Auswertungen",
    ],
    offerings: [
      {
        Icon: Search,
        title: "Strategie & Analyse",
        text: "Zielgruppe, Plattformen, Wettbewerb und Ziele – die Grundlage für alles Weitere.",
      },
      {
        Icon: CalendarDays,
        title: "Redaktionsplan",
        text: "Themen, Formate und Rhythmus für die nächsten Wochen, damit nie die Frage aufkommt, was heute gepostet wird.",
      },
      {
        Icon: Video,
        title: "Content-Produktion",
        text: "Grafiken, Karussells, Reels und Texte im Stil Ihrer Marke – oder Vorlagen, mit denen Ihr Team selbst gestaltet.",
      },
      {
        Icon: Users,
        title: "Community Management",
        text: "Kommentare und Nachrichten freundlich und zeitnah beantworten, Kontakte zu Kunden pflegen.",
      },
      {
        Icon: Megaphone,
        title: "Werbekampagnen",
        text: "Gezielte Anzeigen auf Instagram, Facebook, LinkedIn oder TikTok mit klarem Budget und Ziel.",
      },
      {
        Icon: TrendingUp,
        title: "Reporting",
        text: "Verständliche Auswertungen: Was hat funktioniert, was nicht, und was ändern wir als Nächstes?",
      },
    ],
    useCases: [
      {
        title: "Lokale Sichtbarkeit",
        text: "Ein Café, Hotel oder Geschäft erreicht Menschen in der Region und bleibt Stammgästen im Gedächtnis.",
      },
      {
        title: "Produktlaunch oder Eröffnung",
        text: "Eine Kampagne mit Vorlauf, Countdown und Anzeigen, damit zum Start die richtigen Leute Bescheid wissen.",
      },
      {
        title: "Recruiting über Social Media",
        text: "Einblicke ins Team und gezielte Anzeigen, die Fachkräfte dort erreichen, wo sie ohnehin scrollen.",
      },
    ],
    process: [
      { title: "Analyse", text: "Bestandsaufnahme Ihrer Kanäle, Ihrer Zielgruppe und der Mitbewerber." },
      { title: "Strategie", text: "Ziele, Plattformen, Themen und Tonalität – festgehalten in einem kompakten Plan." },
      { title: "Umsetzung", text: "Content-Produktion und Veröffentlichung nach Redaktionsplan, auf Wunsch mit Anzeigen." },
      { title: "Auswertung", text: "Monatliche Analyse der Zahlen und Anpassung der Strategie." },
    ],
    aiNote:
      "KI unterstützt bei Themenrecherche, Textentwürfen und dem Auswerten von Kennzahlen. Was veröffentlicht wird, formulieren und prüfen wir selbst – damit Ihre Kanäle nach Ihnen klingen, nicht nach Maschine.",
    stack: ["Meta Business Suite", "LinkedIn", "TikTok", "Canva", "Figma", "CapCut"],
    faq: [
      {
        q: "Auf welchen Plattformen sollte ich aktiv sein?",
        a: "Dort, wo Ihre Zielgruppe ist. Für viele lokale Unternehmen sind das Instagram und Google, im B2B-Bereich oft LinkedIn. Das klären wir in der Analyse.",
      },
      {
        q: "Wie oft muss ich posten?",
        a: "Regelmäßigkeit ist wichtiger als Masse. Wir planen einen Rhythmus, den Sie dauerhaft halten können – lieber zwei gute Beiträge pro Woche als sieben schnelle.",
      },
      {
        q: "Übernehmt ihr die Kanäle komplett?",
        a: "Ganz nach Wunsch: von der reinen Strategie und Vorlagen für Ihr Team bis zur vollständigen Betreuung inklusive Community Management.",
      },
      {
        q: "Wie hoch sollte das Werbebudget sein?",
        a: "Schon mit kleinen Budgets lassen sich lokale Zielgruppen erreichen. Wir starten mit einem Testbudget und erhöhen dort, wo es sich lohnt.",
      },
    ],
    references: [],
  },
];
