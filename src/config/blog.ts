
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

// Function to migrate local blog posts to Firestore
export async function migrateBlogPostsToFirestore() {
  const postsCollection = collection(db, 'blogPosts');
  const snapshot = await getDocs(postsCollection);
  
  if (snapshot.empty) {
    console.log('Migrating blog posts to Firestore...');
    const batch = writeBatch(db);
    blogPosts.forEach(post => {
      const docRef = doc(postsCollection);
      batch.set(docRef, post);
    });
    await batch.commit();
    console.log('Migration complete!');
  } else {
    console.log('Blog posts already exist in Firestore. No migration needed.');
  }
}
