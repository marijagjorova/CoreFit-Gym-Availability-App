import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXe31En8LxvswXct-NtFv8qPEga2bXojY",
  authDomain: "corefit-72560.firebaseapp.com",
  projectId: "corefit-72560",
  storageBucket: "corefit-72560.firebasestorage.app",
  messagingSenderId: "857192716384",
  appId: "1:857192716384:web:d12ff2d070f3cf32cecb05",
  measurementId: "G-G95Z43MG6N"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

