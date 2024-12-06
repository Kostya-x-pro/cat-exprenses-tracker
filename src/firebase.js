import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0v8ib3bQR7_kxGFYEnyxt6R0xt9Rc5Xc",
  authDomain: "expense-tracker-1a062.firebaseapp.com",
  projectId: "expense-tracker-1a062",
  storageBucket: "expense-tracker-1a062.firebasestorage.app",
  messagingSenderId: "332414211916",
  appId: "1:332414211916:web:52620fb3a05a44718921e9",
  measurementId: "G-EKDG38B5L6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
