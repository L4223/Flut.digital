
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
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

const formSchema = z.object({
  title: z.string().min(5, "Titel muss mind. 5 Zeichen haben."),
  slug: z.string().min(3, "Slug muss mind. 3 Zeichen haben."),
  description: z.string().min(10, "Beschreibung muss mind. 10 Zeichen haben."),
  date: z.string(),
  tags: z.string(),
  imageUrl: z.string().url("Bitte eine gültige URL eingeben."),
  imageHint: z.string(),
});

export default function NewBlogPostPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }),
      tags: "",
      imageUrl: "",
      imageHint: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!db) return;
    try {
      const docRef = await addDoc(collection(db, "blogPosts"), {
        ...values,
        tags: values.tags.split(',').map(tag => tag.trim()),
      });
      console.log("Document written with ID: ", docRef.id);
      toast({
        title: "Erfolgreich gespeichert!",
        description: "Der Blogbeitrag wurde erstellt.",
      });
      router.push("/admin/blog");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Beitrag konnte nicht gespeichert werden.",
      });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Neuen Blogbeitrag erstellen</h1>
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
            {form.formState.isSubmitting ? "Wird gespeichert..." : "Beitrag speichern"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
