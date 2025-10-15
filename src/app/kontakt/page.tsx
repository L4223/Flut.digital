import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Mail, MapPin } from "lucide-react";

export default function KontaktPage() {
  return (
    <div className="container mx-auto max-w-6xl px-10 py-16 md:py-24">
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
                    <h3 className="text-xl font-semibold mb-4">Direkter Draht</h3>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold text-foreground">Email</h4>
                                <a href="mailto:hallo@flut.digital" className="hover:text-primary transition-colors">hallo@flut.digital</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold text-foreground">Standort</h4>
                                <p>Digital-Hub, Deutschland</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />
                
                <div>
                    <h3 className="text-xl font-semibold mb-4">Termin Buchen</h3>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <Calendar className="h-5 w-5 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold text-foreground">Online Kalender</h4>
                                <p>Finden Sie einen passenden Termin für ein unverbindliches Erstgespräch.</p>
                                <a href="#" className="text-primary font-semibold hover:underline mt-2 inline-block">Jetzt Termin vereinbaren &rarr;</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Clock className="h-5 w-5 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold text-foreground">Verfügbarkeit</h4>
                                <p>Montag - Freitag: 09:00 - 18:00 Uhr</p>
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
