
"use client"
import { useEffect, useState } from 'react';
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from '@/config/blog';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

async function getPostData(slug: string): Promise<BlogPost | null> {
    const q = query(collection(db, "blogPosts"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    return querySnapshot.docs[0].data() as BlogPost;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const { slug } = params;

    useEffect(() => {
        if (slug) {
            getPostData(slug).then(data => {
                setPost(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return <div className="container mx-auto px-4 py-16 md:py-24 text-center">Lade Beitrag...</div>
    }

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <header className="mb-8">
                    <div className="flex gap-2 mb-2">
                        {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>
                    <p className="text-muted-foreground">{post.date}</p>
                </header>

                <div className="aspect-video overflow-hidden rounded-lg mb-8">
                     <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={1200}
                        height={630}
                        data-ai-hint={post.imageHint}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="prose prose-invert max-w-none prose-lg">
                    <p>{post.description}</p>
                    {/* Here you would render the full blog post content if you had it. */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </motion.article>
        </div>
    );
}
