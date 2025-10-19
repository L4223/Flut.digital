
"use client"
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost } from "@/config/blog";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "blogPosts"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => doc.data() as BlogPost);
      setBlogPosts(postsData);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-8 py-16 md:py-24">
      <motion.header 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Unser Tech-Blog</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Einblicke, Anleitungen und Gedanken aus der Welt der digitalen Innovation.
        </p>
      </motion.header>
      
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <Link href={`/blog/${post.slug}`} className="group h-full flex">
              <Card className="h-full w-full overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      unoptimized
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
