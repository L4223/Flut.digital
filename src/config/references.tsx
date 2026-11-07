
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from "react";

export type Reference = {
    slug: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageHint: string;
    details: React.ReactNode | string;
    features: string[];
    createdAt?: any;
    // Optional fields for richer case studies (static references below).
    client?: string;
    year?: string;
    url?: string;
    mobileImageUrl?: string;
    gallery?: { src: string; alt: string }[];
    stack?: string[];
    challenge?: string;
    solution?: string;
    aiNote?: string;
}

/**
 * Case studies shipped with the code. Firestore entries are shown in addition
 * (see src/lib/references.ts); a Firestore entry with the same slug wins.
 */
export const staticReferences: Reference[] = [
    {
        slug: "bei-jost",
        title: "Bei Jost – Café, Laden & B&B",
        client: "Café Bei Jost, Dänisch-Nienhof",
        category: "Website & CMS",
        description:
            "Eine warme, schnelle Website für ein Dorfcafé an der Ostsee – mit eigenem Admin-Bereich, in dem Karte, Öffnungszeiten und Neuigkeiten ohne Technikwissen gepflegt werden.",
        imageUrl: "/images/referenzen/beijost-desktop.jpg",
        mobileImageUrl: "/images/referenzen/beijost-mobile.jpg",
        imageHint: "Café Website Startseite",
        gallery: [
            { src: "/images/referenzen/beijost-karte.jpg", alt: "Speisekarte mit Kuchen und Getränken auf der Bei-Jost-Website" },
        ],
        challenge:
            "Das Café brauchte eine Website, die den Charme des Ortes transportiert und die das Team selbst aktuell halten kann – ohne komplizierte Systeme und ohne Technikwissen.",
        solution:
            "Ein eigenständiges Design mit warmen Farben und verspielter Typografie, eine Startseite mit Sprungnavigation zu Karte, B&B, Öffnungszeiten und Anfahrt sowie ein passwortgeschütztes Dashboard, in dem alle Inhalte direkt bearbeitet werden.",
        details:
            "Die Seite ist mit Next.js gebaut und speichert Inhalte in einem schlanken Key-Value-Store. Strukturierte Daten (JSON-LD) für Café und B&B helfen Google, Öffnungszeiten und Adresse korrekt anzuzeigen. Die Umsetzung ist barrierearm und auf Smartphones optimiert – dort, wo die meisten Gäste nach Öffnungszeiten suchen.",
        features: [
            "Individuelles Design mit eigener Bildsprache",
            "Admin-Dashboard für Karte, Zeiten & News",
            "Aktueller Öffnungsstatus auf der Startseite",
            "Strukturierte Daten für Google (JSON-LD)",
            "Mobil optimiert & barrierearm",
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Upstash Redis", "Vercel"],
    },
    {
        slug: "kiel-visionen",
        title: "Kiel Visionen – Spielplätze in AR gestalten",
        client: "Beteiligungsprojekt für Kinder",
        category: "Web-App & AR",
        description:
            "Kinder scannen einen Ort, platzieren 3D-Spielgeräte per Augmented Reality und reichen ihre Idee ein. Die Verwaltung sieht auf einem Dashboard, welche Wünsche am häufigsten sind.",
        imageUrl: "/images/referenzen/kielvision-desktop.jpg",
        mobileImageUrl: "/images/referenzen/kielvision-mobile.jpg",
        imageHint: "AR Web-App Startseite",
        challenge:
            "Beteiligung von Kindern bei der Planung von Spielplätzen und Schulhöfen ist oft papierlastig und abstrakt. Gesucht war ein Werkzeug, das Spaß macht und trotzdem auswertbare Ergebnisse liefert.",
        solution:
            "Eine Web-App ohne Installation: Ort-Code eingeben oder QR-Code scannen, ein 3D-Objekt auswählen, per AR am echten Ort platzieren und die Idee mit Titel und Beschreibung abschicken. Ein Admin-Bereich zeigt Statistiken pro Ort und erlaubt neue Orte und Objekte anzulegen.",
        details:
            "3D-Modelle werden mit model-viewer direkt im Browser dargestellt und auf Smartphones in AR geöffnet. Firebase übernimmt Anmeldung, Datenbank und Bild-Uploads. Entwickelt wurde mit einem KI-gestützten Workflow: Konzept, Datenmodell und erste Oberflächen entstanden im Dialog mit KI und wurden anschließend von Hand geprüft und verfeinert.",
        aiNote: "Konzept, Datenmodell und Prototyp wurden KI-gestützt erarbeitet und anschließend gezielt verfeinert.",
        features: [
            "AR direkt im Browser – keine App nötig",
            "Ort-Codes & QR-Codes für reale Orte",
            "Ideen-Galerie pro Ort",
            "Auswertungs-Dashboard für die Verwaltung",
        ],
        stack: ["Next.js", "TypeScript", "model-viewer / WebXR", "Firebase", "Genkit", "Tailwind CSS"],
    },
    {
        slug: "schoolxr",
        title: "SchoolXR – 3D-Lerninhalte für den Unterricht",
        client: "Bachelorarbeit in Kooperation mit Dataport",
        category: "WebXR & Bildung",
        description:
            "Ein Werkzeug, mit dem Lehrkräfte 3D-Modelle mit Erklärungen und Aufgaben verbinden – direkt im Browser, auf PC, Tablet und Smartphone, ohne spezielle XR-Hardware.",
        imageUrl: "/images/referenzen/schoolxr-desktop.jpg",
        mobileImageUrl: "/images/referenzen/schoolxr-mobile.jpg",
        imageHint: "WebXR Lernplattform",
        challenge:
            "3D und Augmented Reality können Unterricht anschaulicher machen, scheitern in Schulen aber oft an Hardware, Installationen und Datenschutz.",
        solution:
            "Eine Web-Anwendung mit zwei Wegen: Lehrkräfte wählen ein Modell, setzen Hotspots mit Fachinformationen und Aufgaben und erhalten eine fertige Lernvorlage. Schüler:innen öffnen die Vorlage, erkunden das Modell und bearbeiten die Aufgaben.",
        details:
            "Die Anwendung nutzt die Sketchfab-Bibliothek als Quelle für 3D-Modelle und ist für die Einbindung in Lernmanagementsysteme wie Moodle und dBildungscloud konzipiert.",
        features: [
            "Geführter Ablauf: Auswählen, Anpassen, Fertig",
            "Hotspots mit Erklärungen & Quizfragen",
            "Läuft auf PC, Tablet und Smartphone",
            "Konzipiert für Moodle & dBildungscloud",
        ],
        stack: ["React", "Vite", "model-viewer / WebXR", "Sketchfab API", "Node.js", "Tailwind CSS"],
    },
];

/** @deprecated kept for the one-off Firestore migration below. */
export const references: Reference[] = [];

// Function to migrate local references to Firestore
export async function migrateReferencesToFirestore() {
  if (!db) return;
  if (!db || references.length === 0) return;
  const refsCollection = collection(db, 'references');
  const snapshot = await getDocs(refsCollection);
  
  if (snapshot.empty) {
    console.log('Migrating references to Firestore...');
    const batch = writeBatch(db);
    references.forEach(ref => {
      // Create a new plain object without React nodes
      const { details, ...rest } = ref;
      const firestoreDoc = {
        ...rest,
        details: typeof details === 'string' ? details : 'React-Komponente kann nicht in Firestore gespeichert werden.'
      };
      const docRef = doc(refsCollection);
      batch.set(docRef, firestoreDoc);
    });
    await batch.commit();
    console.log('Reference migration complete!');
  } else {
    // console.log('References already exist in Firestore. No migration needed.');
  }
}
