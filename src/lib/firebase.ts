// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-8029359938-e47f4",
  "appId": "1:117075730063:web:9aabd6248f32c10c291afa",
  "apiKey": "AIzaSyBnmDo3PgolkA-oWaglMDhjQ9dY7MK1ZQU",
  "authDomain": "studio-8029359938-e47f4.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "117075730063"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
