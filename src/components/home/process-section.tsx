import { Card } from "../ui/card";
import { Lightbulb, DraftingCompass, Code, Rocket } from "lucide-react";

const processSteps = [
    {
        title: "1. Discovery & Strategie",
        description: "Wir analysieren Ihre Ziele und entwickeln eine maßgeschneiderte Digitalstrategie.",
        icon: Lightbulb
    },
    {
        title: "2. Design & Prototyping",
        description: "Kreative Konzeption und nutzerzentriertes UI/UX-Design, das Ihre Marke widerspiegelt.",
        icon: DraftingCompass
    },
    {
        title: "3. Entwicklung & Umsetzung",
        description: "Agile Entwicklung mit modernsten Technologien für ein robustes und skalierbares Produkt.",
        icon: Code
    },
    {
        title: "4. Launch & Optimierung",
        description: "Go-Live, Monitoring und kontinuierliche Optimierung für nachhaltigen Erfolg.",
        icon: Rocket
    }
];

export default function ProcessSection() {
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                    Unser bewährter Prozess
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                    Von der Idee bis zum Launch – wir begleiten Sie transparent und partnerschaftlich.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                    <Card key={index} className="p-6 text-center bg-secondary/50 border-0">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-background rounded-full border">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}
