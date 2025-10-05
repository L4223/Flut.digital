
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(5, "Titel muss mind. 5 Zeichen haben."),
  slug: z.string().min(3, "Slug muss mind. 3 Zeichen haben."),
  description: z.string().min(10, "Beschreibung muss mind. 10 Zeichen haben."),
  date: z.string(),
  tags: z.string(),
  imageUrl: z.string().url("Bitte eine gültige URL eingeben."),
  imageHint: z.string(),
});

export default function EditBlogPostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        if (!db) return;
        const docRef = doc(db, "blogPosts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          form.reset({
            ...postData,
            tags: Array.isArray(postData.tags) ? postData.tags.join(', ') : '',
          });
        } else {
          toast({ variant: "destructive", title: "Fehler", description: "Beitrag nicht gefunden."});
          router.push("/admin/blog");
        }
      };
      fetchPost();
    }
  }, [postId, form, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!db) return;
    try {
      const docRef = doc(db, "blogPosts", postId);
      await updateDoc(docRef, {
        ...values,
        tags: values.tags.split(',').map(tag => tag.trim()),
      });
      toast({
        title: "Erfolgreich aktualisiert!",
        description: "Der Blogbeitrag wurde gespeichert.",
      });
      router.push("/admin/blog");
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Beitrag konnte nicht aktualisiert werden.",
      });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blogbeitrag bearbeiten</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Titel des Beitrags" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="einzigartiger-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschreibung</FormLabel>
                <FormControl>
                  <Textarea placeholder="Kurze Zusammenfassung des Inhalts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (kommasepariert)</FormLabel>
                <FormControl>
                  <Input placeholder="KI, Webentwicklung, Design" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild-URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://picsum.photos/seed/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild-Hinweis (für KI)</FormLabel>
                <FormControl>
                  <Input placeholder="zwei schlagwörter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Wird gespeichert..." : "Änderungen speichern"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
