
"use client"
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';

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

    useEffect(() => {
        async function fetchSubmissions() {
            const q = query(collection(db, "contactSubmissions"), orderBy("submittedAt", "desc"));
            const querySnapshot = await getDocs(q);
            const submissionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
            setSubmissions(submissionsData);
        }
        fetchSubmissions();
    }, []);

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
                </Card>
            )) : (
                <p>Keine Kontaktanfragen vorhanden.</p>
            )}
        </div>
    </div>
  );
}
