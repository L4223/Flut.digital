import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { staticReferences, type Reference } from "@/config/references";

/** All references: Firestore entries first (newest content), then static case studies. */
export async function getAllReferences(): Promise<Reference[]> {
  let remote: Reference[] = [];
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, "references"));
      remote = snapshot.docs.map((d) => d.data() as Reference);
    } catch {
      remote = [];
    }
  }
  const remoteSlugs = new Set(remote.map((r) => r.slug));
  return [...remote, ...staticReferences.filter((r) => !remoteSlugs.has(r.slug))];
}

export async function getReference(slug: string): Promise<Reference | null> {
  if (db) {
    try {
      const q = query(collection(db, "references"), where("slug", "==", slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) return snapshot.docs[0].data() as Reference;
    } catch {
      // fall through to static data
    }
  }
  return staticReferences.find((r) => r.slug === slug) ?? null;
}
