
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the cookies
    try {
        const cookieConsent = localStorage.getItem("cookie_consent");
        if (!cookieConsent) {
          // If not, show the banner after a short delay
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 2000);
          return () => clearTimeout(timer);
        }
    } catch (e) {
        console.error("Could not access local storage:", e);
    }
  }, []);

  const handleAccept = () => {
    // Store the consent in localStorage
     try {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
    } catch (e) {
        console.error("Could not access local storage:", e);
        setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-50 max-w-lg"
        >
          <div className="glass rounded-lg p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Cookie className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-grow">
                <h4 className="font-bold text-base">Wir verwenden Cookies</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Wir nutzen Cookies, um Ihr Erlebnis auf unserer Website zu verbessern. Durch die weitere Nutzung stimmen Sie der Verwendung zu. Mehr erfahren Sie in unserer{" "}
                  <Link href="/recht/datenschutz" className="underline hover:text-primary">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
              <Button onClick={handleAccept} className="w-full md:w-auto flex-shrink-0">
                Akzeptieren
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
