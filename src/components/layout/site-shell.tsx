'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot/chatbot';
import CursorTrail from '@/components/home/cursor-trail';

// Three.js is large; keep it out of the initial bundle and off the server.
const BackgroundPointsAnimation = dynamic(
  () => import('@/components/home/background-points-animation'),
  { ssr: false }
);

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppArea = pathname.startsWith('/admin') || pathname === '/login';

  if (isAppArea) {
    return (
      <div className="min-h-screen bg-muted/40">
        {children}
        <Toaster />
      </div>
    );
  }

  return (
    // reducedMotion="user": framer-motion drops transform/layout animation
    // when the visitor asks for reduced motion; opacity fades remain.
    <MotionConfig reducedMotion="user">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Zum Inhalt springen
      </a>
      <div className="flex min-h-screen flex-col">
        <BackgroundPointsAnimation />
        <CursorTrail />
        <Header />
        <main id="inhalt" className="flex-grow">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <Toaster />
      </div>
    </MotionConfig>
  );
}
