
"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Reference } from '@/config/references';
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

type ReferenceWithId = Reference & { id: string };

export default function AdminReferencesPage() {
    const [references, setReferences] = useState<ReferenceWithId[]>([]);
    const { toast } = useToast();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [refToDelete, setRefToDelete] = useState<string | null>(null);

    async function fetchReferences() {
        if (!db) return;
        const querySnapshot = await getDocs(collection(db, "references"));
        const referencesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReferenceWithId));
        setReferences(referencesData);
    }

    useEffect(() => {
        fetchReferences();
    }, []);

    const handleDeleteClick = (id: string) => {
        setRefToDelete(id);
        setShowDeleteDialog(true);
    };

    const handleDelete = async () => {
        if (!refToDelete || !db) return;

        try {
            await deleteDoc(doc(db, "references", refToDelete));
            toast({ title: "Erfolg", description: "Referenz wurde gelöscht." });
            fetchReferences();
        } catch (error) {
            console.error("Error deleting document: ", error);
            toast({ variant: "destructive", title: "Fehler", description: "Referenz konnte nicht gelöscht werden." });
        } finally {
            setShowDeleteDialog(false);
            setRefToDelete(null);
        }
    }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Referenzen verwalten</h1>
            <Button asChild>
                <Link href="/admin/referenzen/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Neue Referenz
                </Link>
            </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {references.map(ref => (
                <Card key={ref.id}>
                    <CardHeader>
                        <CardTitle>{ref.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{ref.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={`/admin/referenzen/edit/${ref.id}`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(ref.id)}>
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
                        Möchten Sie diese Referenz wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setRefToDelete(null)}>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Löschen</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
