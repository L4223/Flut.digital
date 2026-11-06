import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technologien",
  description: "Der Tech-Stack von Flut.digital: Next.js, React, TypeScript, Firebase, Three.js und mehr.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
