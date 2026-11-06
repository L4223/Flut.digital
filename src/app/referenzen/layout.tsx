import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen",
  description: "Ausgewählte Projekte von Flut.digital: Websites, KI-Lösungen und interaktive 3D-Erlebnisse.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
