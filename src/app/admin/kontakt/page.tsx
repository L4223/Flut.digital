
"use client"
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    message: string;
    submittedAt: {
        seconds: number,
        nanoseconds: number
    };
}

export default function AdminKontaktPage() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const { toast } = useToast();

    async function fetchSubmissions() {
        const q = query(collection(db, "contactSubmissions"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
        setSubmissions(submissionsData);
    }

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleDelete = async (id: string) => {
        if(confirm("Möchten Sie diese Anfrage wirklich löschen?")) {
            try {
                await deleteDoc(doc(db, "contactSubmissions", id));
                toast({ title: "Erfolg", description: "Anfrage wurde gelöscht." });
                fetchSubmissions();
            } catch (error) {
                console.error("Error deleting document: ", error);
                toast({ variant: "destructive", title: "Fehler", description: "Anfrage konnte nicht gelöscht werden." });
            }
        }
    }

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Kontaktanfragen</h1>
        
        <div className="space-y-4">
            {submissions.length > 0 ? submissions.map(submission => (
                <Card key={submission.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{submission.name}</CardTitle>
                                <CardDescription>{submission.email}</CardDescription>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {submission.submittedAt ? format(new Date(submission.submittedAt.seconds * 1000), 'dd.MM.yyyy, HH:mm') : ''} Uhr
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{submission.message}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(submission.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            )) : (
                <p>Keine Kontaktanfragen vorhanden.</p>
            )}
        </div>
    </div>
  );
}
