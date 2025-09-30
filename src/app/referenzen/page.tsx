import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const references = [
  {
    slug: "projekt-alpha",
    title: "Projekt Alpha: Corporate Re-Branding",
    category: "Branding",
    imageUrl: "https://picsum.photos/seed/ref1/600/400",
    imageHint: "abstract project"
  },
  {
    slug: "projekt-beta",
    title: "Projekt Beta: Headless E-Commerce Plattform",
    category: "Webentwicklung",
    imageUrl: "https://picsum.photos/seed/ref2/600/400",
    imageHint: "abstract technology"
  },
  {
    slug: "projekt-gamma",
    title: "Projekt Gamma: Interaktive AR-Anwendung",
    category: "3D/AR",
    imageUrl: "https://picsum.photos/seed/ref3/600/400",
    imageHint: "digital branding"
  },
  {
    slug: "projekt-delta",
    title: "Projekt Delta: KI-gestützte Analyse-Tools",
    category: "KI-Lösungen",
    imageUrl: "https://picsum.photos/seed/ref4/600/400",
    imageHint: "data analytics"
  },
  {
    slug: "projekt-epsilon",
    title: "Projekt Epsilon: Social Media Kampagne",
    category: "Social Media",
    imageUrl: "https://picsum.photos/seed/ref5/600/400",
    imageHint: "social media"
  },
    {
    slug: "projekt-zeta",
    title: "Projekt Zeta: Web-App für Start-up",
    category: "Webentwicklung",
    imageUrl: "https://picsum.photos/seed/ref6/600/400",
    imageHint: "modern startup"
  },
];

export default function ReferenzenPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Unsere Referenzen</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Ein Auszug unserer Arbeit, der für sich spricht. Wir sind stolz auf jedes einzelne Projekt.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {references.map((ref) => (
          <Link href={`/referenzen/${ref.slug}`} key={ref.slug} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10">
              <CardHeader className="p-0 relative">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={ref.imageUrl}
                    alt={ref.title}
                    width={600}
                    height={400}
                    data-ai-hint={ref.imageHint}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                 <div className="absolute top-4 right-4">
                    <Badge>{ref.category}</Badge>
                 </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{ref.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
