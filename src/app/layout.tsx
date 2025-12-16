
'use client'
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot/chatbot';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { migrateBlogPostsToFirestore } from '@/config/blog';
import { migrateReferencesToFirestore } from '@/config/references';
import CookieBanner from '@/components/layout/cookie-banner';
import { hasApiKey } from '@/lib/firebase';
import CursorTrail from '@/components/home/cursor-trail';
import HeroWaveAnimation from '@/components/home/hero-wave-animation';
import BackgroundPointsAnimation from '@/components/home/background-points-animation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';
  const isHomePage = pathname === '/';

  useEffect(() => {
    // This is a one-time migration script.
    // In a real production app, you would run this from a CLI or a secure endpoint.
    if (hasApiKey) {
      migrateBlogPostsToFirestore();
      migrateReferencesToFirestore();
    }
  }, []);

  if (isAdminPage || isLoginPage) {
    return (
      <html lang="de" className="h-full bg-muted/40">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </head>
        <body className="h-full font-body antialiased">
            {children}
            <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {isHomePage && <HeroWaveAnimation />}
        <BackgroundPointsAnimation />
        <CursorTrail />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Chatbot />
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
