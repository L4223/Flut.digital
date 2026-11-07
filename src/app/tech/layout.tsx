import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technologien",
  description: "Der Tech-Stack von Flut.digital verständlich erklärt – und wie wir KI gezielt im Entwicklungsprozess einsetzen.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
