
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

const formSchema = z.object({
  title: z.string().min(5, "Titel muss mind. 5 Zeichen haben."),
  slug: z.string().min(3, "Slug muss mind. 3 Zeichen haben."),
  description: z.string().min(10, "Beschreibung muss mind. 10 Zeichen haben."),
  category: z.string().min(2, "Kategorie muss mind. 2 Zeichen haben."),
  features: z.string().min(3, "Mindestens ein Feature angeben."),
  details: z.string().min(10, "Details müssen mind. 10 Zeichen haben."),
  imageUrl: z.string().url("Bitte eine gültige URL eingeben."),
  imageHint: z.string(),
});

export default function NewReferencePage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category: "",
      features: "",
      details: "",
      imageUrl: "",
      imageHint: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!db) return;
    try {
      await addDoc(collection(db, "references"), {
        ...values,
        features: values.features.split(',').map(f => f.trim()),
      });
      toast({
        title: "Erfolgreich gespeichert!",
        description: "Die Referenz wurde erstellt.",
      });
      router.push("/admin/referenzen");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Referenz konnte nicht gespeichert werden.",
      });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Neue Referenz erstellen</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Projekttitel" {...field} />
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorie</FormLabel>
                <FormControl>
                  <Input placeholder="z.B. Webentwicklung" {...field} />
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
                <FormLabel>Kurzbeschreibung</FormLabel>
                <FormControl>
                  <Textarea placeholder="Eine kurze Zusammenfassung des Projekts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Projektdetails</FormLabel>
                <FormControl>
                  <Textarea placeholder="Ausführliche Beschreibung des Projekts" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kernleistungen (kommasepariert)</FormLabel>
                <FormControl>
                  <Input placeholder="Leistung 1, Leistung 2, Leistung 3" {...field} />
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
            {form.formState.isSubmitting ? "Wird gespeichert..." : "Referenz speichern"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
