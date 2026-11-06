import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel zu Webentwicklung, KI und digitalem Design von Flut.digital.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
