import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Wer hinter Flut.digital steht, wofür wir arbeiten und wie wir Projekte angehen.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
