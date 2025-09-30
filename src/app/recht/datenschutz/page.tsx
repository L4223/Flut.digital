
export default function DatenschutzPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <div className="prose prose-invert max-w-none prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tighter prose-h2:font-semibold prose-a:text-primary hover:prose-a:text-accent">
        <h1>Datenschutzerklärung</h1>
        <p>Stand: Juli 2024</p>
        
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
          passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
          Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
        </p>
        
        <h2>2. Allgemeine Hinweise und Pflicht­informationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
          Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
          sowie dieser Datenschutzerklärung.
        </p>

        <h3>Verantwortliche Stelle</h3>
        <p>
            [Name/Firma des Betreibers]<br/>
            [Straße und Hausnummer]<br/>
            [PLZ und Ort]<br/>
            [Land]<br/>
            E-Mail: [E-Mail-Adresse]
        </p>

        <h2>3. Datenerfassung auf dieser Website</h2>
        <h3>Cookies</h3>
        <p>
          Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf
          Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
          (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
        </p>
        
        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
          Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
          Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
          Ihre Einwilligung weiter.
        </p>

        {/* Weitere Abschnitte nach Bedarf hinzufügen */}
      </div>
    </div>
  );
}
