
"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/config/blog';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type BlogPostWithId = BlogPost & { id: string };

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPostWithId[]>([]);
    const { toast } = useToast();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    async function fetchPosts() {
        if (!db) return;
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPostWithId));
        setPosts(postsData);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDeleteClick = (id: string) => {
        setPostToDelete(id);
        setShowDeleteDialog(true);
    };

    const handleDelete = async () => {
        if (!postToDelete || !db) return;
        
        try {
            await deleteDoc(doc(db, "blogPosts", postToDelete));
            toast({ title: "Erfolg", description: "Blogbeitrag wurde gelöscht." });
            fetchPosts();
        } catch (error) {
            console.error("Error deleting document: ", error);
            toast({ variant: "destructive", title: "Fehler", description: "Beitrag konnte nicht gelöscht werden." });
        } finally {
            setShowDeleteDialog(false);
            setPostToDelete(null);
        }
    }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Blogbeiträge verwalten</h1>
            <Button asChild>
                <Link href="/admin/blog/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Neuer Beitrag
                </Link>
            </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={`/admin/blog/edit/${post.id}`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(post.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Möchten Sie diesen Blogbeitrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setPostToDelete(null)}>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Löschen</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
