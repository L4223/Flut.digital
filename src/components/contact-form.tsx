"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import CtaButton from "./cta-button"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";


const formSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  message: z.string().min(10, "Ihre Nachricht muss mindestens 10 Zeichen lang sein.").max(1000, "Ihre Nachricht darf 1000 Zeichen nicht überschreiten."),
})

export function ContactForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addDoc(collection(db, "contactSubmissions"), {
        ...values,
        submittedAt: serverTimestamp(),
      });
      
      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns bald bei Ihnen melden.",
      });
      
      form.reset();

    } catch (error) {
      console.error("Error writing document: ", error);
       toast({
        variant: "destructive",
        title: "Fehler!",
        description: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ihr Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ihre@email.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ihre Nachricht</FormLabel>
              <FormControl>
                <Textarea placeholder="Worum geht es in Ihrem Projekt?" rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CtaButton type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
        </CtaButton>
      </form>
    </Form>
  )
}
