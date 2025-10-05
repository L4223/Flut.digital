// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() || {};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: publicRuntimeConfig?.firebaseApiKey,
  authDomain: publicRuntimeConfig?.firebaseAuthDomain,
  projectId: publicRuntimeConfig?.firebaseProjectId,
  storageBucket: publicRuntimeConfig?.firebaseStorageBucket,
  messagingSenderId: publicRuntimeConfig?.firebaseMessagingSenderId,
  appId: publicRuntimeConfig?.firebaseAppId,
  measurementId: publicRuntimeConfig?.firebaseMeasurementId,
};

const hasApiKey = !!firebaseConfig.apiKey;

// Initialize Firebase only if the API key is provided
const app = hasApiKey && !getApps().length ? initializeApp(firebaseConfig) : (hasApiKey ? getApp() : null);
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { app, db, auth, hasApiKey };
