import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    slug: "ai-in-web-development",
    title: "Die Rolle der KI in der modernen Webentwicklung",
    description: "Entdecken Sie, wie künstliche Intelligenz die Landschaft der Webentwicklung verändert und neue Möglichkeiten für Unternehmen eröffnet.",
    date: "15. Juli 2024",
    tags: ["KI", "Webentwicklung"],
    imageUrl: "https://picsum.photos/seed/blog1/800/400",
    imageHint: "artificial intelligence"
  },
  {
    slug: "headless-cms-explained",
    title: "Headless CMS: Die Zukunft des Content Managements",
    description: "Ein tiefer Einblick in die Vorteile von Headless-CMS-Architekturen und warum sie für flexible, moderne Web-Anwendungen entscheidend sind.",
    date: "02. Juli 2024",
    tags: ["CMS", "Tech"],
    imageUrl: "https://picsum.photos/seed/blog2/800/400",
    imageHint: "web development"
  },
  {
    slug: "ar-for-ecommerce",
    title: "Augmented Reality im E-Commerce: Ein Game Changer",
    description: "Wie AR das Online-Shopping-Erlebnis revolutioniert und die Konversionsraten in die Höhe treibt.",
    date: "21. Juni 2024",
    tags: ["3D/AR", "E-Commerce"],
    imageUrl: "https://picsum.photos/seed/blog3/800/400",
    imageHint: "augmented reality"
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Unser Tech-Blog</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Einblicke, Anleitungen und Gedanken aus der Welt der digitalen Innovation.
        </p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={800}
                    height={400}
                    data-ai-hint={post.imageHint}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex gap-2 mb-2">
                  {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription className="mb-4">{post.description}</CardDescription>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
