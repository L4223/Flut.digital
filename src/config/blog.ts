export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    imageUrl: string;
    imageHint: string;
};

export const blogPosts: BlogPost[] = [
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
