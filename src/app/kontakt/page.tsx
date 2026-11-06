import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Projekt anfragen oder ein unverbindliches Erstgespräch vereinbaren – per Formular, E-Mail oder Telefon.",
};

const { email, phone, region, hours } = siteConfig.contact;
const termineMailto = `mailto:${email}?subject=${encodeURIComponent("Anfrage Erstgespräch")}&body=${encodeURIComponent("Hallo,\n\nich hätte gern ein Erstgespräch. Mögliche Termine:\n\n")}`;

export default function KontaktPage() {
  return (
    <div className="container mx-auto max-w-6xl px-8 py-16 md:py-24">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Kontakt aufnehmen</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Wir freuen uns darauf, von Ihnen zu hören. Lassen Sie uns über Ihr nächstes Projekt sprechen.
        </p>
      </header>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
            <Card className="bg-secondary/50 border-0">
                <CardHeader>
                    <CardTitle>Schreiben Sie uns eine Nachricht</CardTitle>
                    <CardDescription>Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Direkter Draht</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 mt-1 shrink-0 text-primary" aria-hidden="true"/>
                            <div>
                                <h3 className="font-semibold text-foreground">E-Mail &amp; Telefon</h3>
                                <a href={`mailto:${email}`} className="inline-block py-1 hover:text-primary transition-colors">{email}</a>
                                <br />
                                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="inline-block py-1 hover:text-primary transition-colors">{phone}</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 mt-1 shrink-0 text-primary" aria-hidden="true"/>
                            <div>
                                <h3 className="font-semibold text-foreground">Standort</h3>
                                <p>{region}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">Erstgespräch vereinbaren</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <Calendar className="h-5 w-5 mt-1 shrink-0 text-primary" aria-hidden="true"/>
                            <div>
                                <h3 className="font-semibold text-foreground">Unverbindliches Erstgespräch</h3>
                                <p>Nennen Sie uns kurz Ihr Anliegen und ein paar passende Termine – wir melden uns mit einer Bestätigung.</p>
                                <a href={termineMailto} className="text-primary font-semibold hover:underline mt-2 inline-block py-1">Termin per E-Mail anfragen &rarr;</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Clock className="h-5 w-5 mt-1 shrink-0 text-primary" aria-hidden="true"/>
                            <div>
                                <h3 className="font-semibold text-foreground">Verfügbarkeit</h3>
                                <p>{hours}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
