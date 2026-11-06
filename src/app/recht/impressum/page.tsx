import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  const { owner, address, phone, email } = siteConfig.contact;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <div className="prose prose-invert max-w-none prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tighter prose-h2:font-semibold prose-a:text-primary hover:prose-a:text-accent">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <strong>{owner}</strong>
          <br />
          {siteConfig.name}
          <br />
          {address.street}
          <br />
          {address.postalCode} {address.city}
          <br />
          {address.country}
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
          <br />
          E-Mail: <a href={`mailto:${email}`}>{email}</a>
        </p>

        {/*
          Umsatzsteuer-ID: nur angeben, wenn eine vergeben wurde.
          Abschnitt „Umsatzsteuer-ID gemäß § 27a UStG“ hier ergänzen.
        */}

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {owner}
          <br />
          Anschrift wie oben
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Für übermittelte oder gespeicherte fremde Informationen gelten die
          Haftungsbeschränkungen der §§ 7 bis 10 DDG. Eine Pflicht, solche Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen, besteht nicht. Sobald mir
          Rechtsverletzungen bekannt werden, entferne ich die betreffenden Inhalte umgehend.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
          Bei Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.
        </p>
      </div>
    </div>
  );
}
