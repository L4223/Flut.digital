
"use client";

import { useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, hasApiKey } from "@/lib/firebase";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import WaveLogo from "@/components/icons/wave-logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Bitte eine gültige E-Mail eingeben."),
  password: z.string().min(6, "Passwort muss mind. 6 Zeichen haben."),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) {
        toast({
            variant: "destructive",
            title: "Firebase nicht konfiguriert",
            description: "Bitte hinterlegen Sie Ihre Firebase-Zugangsdaten in den Umgebungsvariablen.",
        });
        return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Anmeldung erfolgreich!",
        description: "Willkommen zurück.",
      });
      router.push("/admin");
    } catch (error) {
      console.error("Error signing in: ", error);
      toast({
        variant: "destructive",
        title: "Fehler bei der Anmeldung",
        description: "E-Mail oder Passwort ist falsch.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
                 <Link href="/" className="flex items-center gap-2">
                    <WaveLogo className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">{siteConfig.name}</span>
                </Link>
            </div>
            <Card>
                <CardHeader className="text-center">
                <CardTitle>Admin-Anmeldung</CardTitle>
                <CardDescription>Bitte melden Sie sich an, um fortzufahren.</CardDescription>
                </CardHeader>
                <CardContent>
                {!hasApiKey && (
                    <Alert variant="destructive" className="mb-6">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Firebase nicht konfiguriert!</AlertTitle>
                        <AlertDescription>
                            Der Login ist deaktiviert, da keine Firebase-Zugangsdaten gefunden wurden. Bitte richten Sie Ihre Umgebungsvariablen ein.
                        </AlertDescription>
                    </Alert>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <fieldset disabled={!hasApiKey || isLoading}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input placeholder="admin@email.de" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passwort</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-6" disabled={!hasApiKey || isLoading}>
                            {isLoading ? "Anmeldung läuft..." : "Anmelden"}
                        </Button>
                    </fieldset>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
