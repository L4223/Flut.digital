
export default function ImpressumPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <div className="prose prose-invert max-w-none prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tighter prose-h2:font-semibold prose-a:text-primary hover:prose-a:text-accent">
        <h1>Impressum</h1>
        
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          [Name/Firma des Betreibers]<br/>
          [Straße und Hausnummer]<br/>
          [PLZ und Ort]<br/>
          [Land]
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: [Telefonnummer]<br/>
          E-Mail: [E-Mail-Adresse]
        </p>

        <h2>Vertreten durch</h2>
        <p>
          [Name des Vertretungsberechtigten]
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br/>
          [USt-IdNr.]
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [Name und Anschrift des Verantwortlichen]
        </p>

        <h2>Haftungsausschluss (Disclaimer)</h2>
        <h3>Haftung für Inhalte</h3>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
          zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </div>
    </div>
  );
}
