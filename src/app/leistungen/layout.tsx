import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Webentwicklung, Branding, 3D/AR, KI-Integration und Social Media – alle Leistungen von Flut.digital im Überblick.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
