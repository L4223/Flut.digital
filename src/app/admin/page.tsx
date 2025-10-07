
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BookText, MessageSquare, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [referenceCount, setReferenceCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      if (!db) return;
      const blogSnapshot = await getDocs(collection(db, "blogPosts"));
      setBlogCount(blogSnapshot.size);

      const contactSnapshot = await getDocs(collection(db, "contactSubmissions"));
      setContactCount(contactSnapshot.size);

      const referenceSnapshot = await getDocs(collection(db, "references"));
      setReferenceCount(referenceSnapshot.size);
    }
    fetchCounts();
  }, []);


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/blog">
          <Card className="hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blogbeiträge</CardTitle>
              <BookText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{blogCount}</p>
              <p className="text-xs text-muted-foreground">Anzahl der Beiträge insgesamt</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/referenzen">
            <Card className="hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Referenzen</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{referenceCount}</p>
                <p className="text-xs text-muted-foreground">Anzahl der Referenzen insgesamt</p>
            </CardContent>
            </Card>
        </Link>
        <Link href="/admin/kontakt">
          <Card className="hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kontaktanfragen</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{contactCount}</p>
              <p className="text-xs text-muted-foreground">Anzahl der Anfragen insgesamt</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
