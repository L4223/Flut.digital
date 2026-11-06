
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from "react";

export type Reference = {
    slug: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageHint: string;
    details: React.ReactNode | string;
    features: string[];
    createdAt?: any;
}

export const references: Reference[] = [];

// Function to migrate local references to Firestore
export async function migrateReferencesToFirestore() {
  if (!db) return;
  if (!db || references.length === 0) return;
  const refsCollection = collection(db, 'references');
  const snapshot = await getDocs(refsCollection);
  
  if (snapshot.empty) {
    console.log('Migrating references to Firestore...');
    const batch = writeBatch(db);
    references.forEach(ref => {
      // Create a new plain object without React nodes
      const { details, ...rest } = ref;
      const firestoreDoc = {
        ...rest,
        details: typeof details === 'string' ? details : 'React-Komponente kann nicht in Firestore gespeichert werden.'
      };
      const docRef = doc(refsCollection);
      batch.set(docRef, firestoreDoc);
    });
    await batch.commit();
    console.log('Reference migration complete!');
  } else {
    // console.log('References already exist in Firestore. No migration needed.');
  }
}
