import React from "react";

export type Reference = {
    slug: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageHint: string;
    details: React.ReactNode;
    features: string[];
}

export const references: Reference[] = [
  {
    slug: "projekt-alpha",
    title: "Projekt Alpha: Corporate Re-Branding",
    category: "Branding",
    description: "Vollständige Neuausrichtung der Markenidentität für ein aufstrebendes Tech-Startup, um die Marktposition zu stärken und eine moderne Zielgruppe anzusprechen.",
    imageUrl: "https://picsum.photos/seed/ref1/1200/630",
    imageHint: "abstract project",
    features: ["Logo & Corporate Design", "Brand-Strategie", "UI/UX-Überarbeitung", "Styleguide-Entwicklung"],
    details: (
      <>
        <h3>Die Herausforderung</h3>
        <p>Ein innovatives Tech-Startup benötigte eine visuelle Identität, die seinem disruptiven Produkt gerecht wird. Das alte Branding war veraltet und sprach die Zielgruppe nicht mehr effektiv an.</p>
        <h3>Unsere Lösung</h3>
        <p>Wir führten einen umfassenden Marken-Workshop durch, um die Kernwerte zu definieren. Darauf aufbauend entwickelten wir ein dynamisches Logo, ein frisches Farbkonzept und eine moderne Typografie. Das Ergebnis ist eine starke, wiedererkennbare Marke, die auf allen digitalen Kanälen überzeugt.</p>
      </>
    )
  },
  {
    slug: "projekt-beta",
    title: "Projekt Beta: Headless E-Commerce Plattform",
    description: "Entwicklung einer hochperformanten, headless E-Commerce-Lösung für einen Modehändler, um Flexibilität zu maximieren und ein einzigartiges Kundenerlebnis zu schaffen.",
    category: "Webentwicklung",
    imageUrl: "https://picsum.photos/seed/ref2/1200/630",
    imageHint: "abstract technology",
    features: ["Next.js Frontend", "Headless CMS-Anbindung", "Anbindung an Warenwirtschaft", "Performance-Optimierung"],
    details: (
      <>
        <h3>Die Herausforderung</h3>
        <p>Ein Modehändler stieß mit seiner monolithischen Shop-Lösung an Wachstumsgrenzen. Gefragt war eine flexible Plattform, die schnelle Ladezeiten und kreative Freiheit im Frontend ermöglicht.</p>
        <h3>Unsere Lösung</h3>
        <p>Wir setzten auf eine Headless-Architektur mit einem Next.js-Frontend für maximale Performance und SEO-Vorteile. Ein angebundenes Headless CMS erlaubt dem Marketing-Team, Inhalte agil und unabhängig von der IT zu pflegen. Das Ergebnis ist ein blitzschneller, conversion-optimierter Online-Shop.</p>
      </>
    )
  },
  {
    slug: "projekt-gamma",
    title: "Projekt Gamma: Interaktive AR-Anwendung",
    description: "Konzeption und Umsetzung einer webbasierten Augmented-Reality-Anwendung für ein Museum, um Exponate digital zum Leben zu erwecken.",
    category: "3D/AR",
    imageUrl: "https://picsum.photos/seed/ref3/1200/630",
    imageHint: "digital branding",
    features: ["Marker-basiertes AR", "3D-Modell-Integration", "Web-optimierte Performance", "CMS zur Pflege der Inhalte"],
    details: (
      <>
        <h3>Die Herausforderung</h3>
        <p>Ein Museum wollte seine Ausstellung für eine jüngere, digital-affine Zielgruppe attraktiver gestalten und zusätzliche Informationsebenen zu den Exponaten bieten.</p>
        <h3>Unsere Lösung</h3>
        <p>Wir entwickelten eine browserbasierte AR-Anwendung, die ohne App-Download funktioniert. Besucher können mit ihrem Smartphone QR-Codes an den Exponaten scannen und erleben, wie diese durch 3D-Animationen, Videos und zusätzliche Informationen zum Leben erweckt werden.</p>
      </>
    )
  },
  {
    slug: "projekt-delta",
    title: "Projekt Delta: KI-gestützte Analyse-Tools",
    description: "Entwicklung eines internen Dashboards mit KI-Komponenten zur automatisierten Auswertung von Marktdaten für ein Finanzunternehmen.",
    category: "KI-Lösungen",
    imageUrl: "https://picsum.photos/seed/ref4/1200/630",
    imageHint: "data analytics",
    features: ["Datenvisualisierungs-Dashboard", "Integration von LLMs", "Sentiment-Analyse", "Automatisierte Reportings"],
    details: (
      <>
        <h3>Die Herausforderung</h3>
        <p>Ein Finanzdienstleister wollte seine manuelle Marktdatenanalyse beschleunigen und tiefere Einblicke aus unstrukturierten Daten wie Nachrichten und Social-Media-Posts gewinnen.</p>
        <h3>Unsere Lösung</h3>
        <p>Wir bauten ein benutzerfreundliches Dashboard, das verschiedene Datenquellen anzapft. Im Kern verarbeitet eine KI große Mengen an Textdaten, führt Sentiment-Analysen durch und fasst die wichtigsten Erkenntnisse zusammen. Analysten können so schneller fundierte Entscheidungen treffen.</p>
      </>
    )
  },
  {
    slug: "projekt-epsilon",
    title: "Projekt Epsilon: Social Media Kampagne",
    description: "Planung und Durchführung einer reichweitenstarken Social-Media-Kampagne für die Einführung eines neuen Konsumprodukts.",
    category: "Social Media",
    imageUrl: "https://picsum.photos/seed/ref5/1200/630",
    imageHint: "social media",
    features: ["Zielgruppenanalyse", "Content-Erstellung", "Performance-Marketing", "Community-Management"],
    details: (
      <>
        <h3>Die Herausforderung</h3>
        <p>Eine neue Getränkemarke sollte erfolgreich im deutschen Markt eingeführt und eine starke Markenbekanntheit bei der Zielgruppe der 18- bis 25-Jährigen aufgebaut werden.</p>
        <h3>Unsere Lösung</h3>
        <p>Wir entwickelten eine Multi-Plattform-Strategie für Instagram und TikTok. Durch eine Mischung aus kreativem Video-Content, gezielten Werbeanzeigen und Kooperationen mit passenden Influencern konnten wir eine hohe Interaktionsrate und eine virale Verbreitung erzielen, die die Verkaufsziele übertraf.</p>
      </>
    )
  },
    {
    slug: "projekt-zeta",
    title: "Projekt Zeta: Web-App für Start-up",
    description: "Entwicklung einer komplexen SaaS-Plattform für ein B2B-Startup, inklusive Nutzerverwaltung und Abrechnungssystem.",
    category: "Webentwicklung",
    imageUrl: "https://picsum.photos/seed/ref6/1200/630",
    imageHint: "modern startup",
    features: ["Multi-Tenancy-Architektur", "Stripe-Integration", "Rollen-basiertes Rechtesystem", "Skalierbare Cloud-Infrastruktur"],
    details: (
      <>
        <h3>Die Herausforderung</h3>
        <p>Ein Startup benötigte eine skalierbare und sichere Plattform, um seinen Software-as-a-Service (SaaS) an Geschäftskunden zu vertreiben. Die Anforderungen umfassten Mandantenfähigkeit, Abonnement-Verwaltung und ein flexibles Rechtesystem.</p>
        <h3>Unsere Lösung</h3>
        <p>Auf Basis von Node.js im Backend und React im Frontend bauten wir eine robuste Web-Anwendung. Die Integration von Stripe ermöglicht eine automatisierte Abrechnung von Abonnements. Das System ist auf der Google Cloud gehostet und für zukünftiges Wachstum ausgelegt.</p>
      </>
    )
  },
];
