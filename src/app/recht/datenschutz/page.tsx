import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  const { owner, address, email, phone } = siteConfig.contact;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <div className="prose prose-invert max-w-none prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tighter prose-h2:font-semibold prose-a:text-primary hover:prose-a:text-accent">
        <h1>Datenschutzerklärung</h1>
        <p>Stand: November 2026</p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <strong>{owner}</strong>, {siteConfig.name}
          <br />
          {address.street}, {address.postalCode} {address.city}
          <br />
          Telefon: {phone}
          <br />
          E-Mail: <a href={`mailto:${email}`}>{email}</a>
        </p>

        <h2>2. Keine Tracking-Cookies, keine Analyse-Tools</h2>
        <p>
          Diese Website setzt keine Cookies zu Analyse-, Marketing- oder Trackingzwecken und bindet keine
          Analyse-Dienste ein. Schriftarten werden von unserem eigenen Server ausgeliefert; beim Seitenaufruf
          wird keine Verbindung zu Google Fonts aufgebaut. Eine Einwilligung nach § 25 TDDDG ist daher nicht
          erforderlich.
        </p>

        <h2>3. Aufruf der Website und Server-Logfiles</h2>
        <p>
          Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Daten wie
          IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer sowie Browser- und Betriebssystemangaben.
          Diese Daten sind erforderlich, um die Website auszuliefern und ihre Sicherheit zu gewährleisten
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        {/* TODO: Hosting-Anbieter (z. B. Firebase App Hosting oder Railway) mit Name, Sitz und
            Auftragsverarbeitungsvertrag hier ergänzen. */}

        <h2>4. Google Firebase (Cloud Firestore)</h2>
        <p>
          Inhalte wie Blogartikel und Referenzen sowie Nachrichten aus dem Kontaktformular werden in Google
          Cloud Firestore gespeichert, einem Dienst der Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland. Beim Laden dieser Inhalte stellt Ihr Browser eine Verbindung zu Servern von Google
          her; dabei wird Ihre IP-Adresse übermittelt. Rechtsgrundlage ist unser berechtigtes Interesse an
          einer zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Eine Übermittlung in die
          USA ist nicht auszuschließen; Google ist nach dem EU-US Data Privacy Framework zertifiziert.
        </p>

        <h2>5. Kontaktformular und E-Mail</h2>
        <p>
          Wenn Sie mir über das Kontaktformular oder per E-Mail schreiben, verarbeite ich Ihren Namen, Ihre
          E-Mail-Adresse und Ihre Nachricht, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO bei
          vorvertraglichen Anfragen, sonst lit. f). Die Daten werden gelöscht, sobald die Anfrage abschließend
          bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>

        <h2>6. KI-Chat</h2>
        <p>
          Der Chat auf dieser Website sendet erst dann Daten, wenn Sie eine Frage abschicken. Der Text Ihrer
          Frage wird von unserem Server zur Erzeugung einer Antwort an die API der Groq, Inc., Mountain View,
          USA, übermittelt (Art. 6 Abs. 1 lit. f DSGVO). Ihre IP-Adresse wird dabei nicht an Groq
          weitergegeben. Da Groq seinen Sitz in den USA hat, findet eine Übermittlung in ein Drittland statt.
          Bitte geben Sie im Chat keine sensiblen oder personenbezogenen Daten ein. Chatverläufe werden von
          uns nicht gespeichert.
        </p>

        {/* TODO: Rechtsgrundlage für die Drittlandübermittlung an Groq prüfen (z. B. Data Processing
            Addendum / EU-Standardvertragsklauseln laut groq.com/privacy) und hier ergänzen. */}

        <h2>7. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO (Art. 15–21 DSGVO). Wenden Sie sich dazu an <a href={`mailto:${email}`}>{email}</a>. Außerdem
          können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa beim Unabhängigen
          Landeszentrum für Datenschutz Schleswig-Holstein (ULD).
        </p>
      </div>
    </div>
  );
}
