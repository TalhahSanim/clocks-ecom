// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkSnyKeFH9BELZR2_ZNKfViVvHzcmDgEQ",
  authDomain: "deleteme-b22c7.firebaseapp.com",
  projectId: "deleteme-b22c7",
  storageBucket: "deleteme-b22c7.firebasestorage.app",
  messagingSenderId: "782997347027",
  appId: "1:782997347027:web:631ff60d4f6298583d9226",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

// Keep the user logged in over browser restarts and Logout clears it
setPersistence(auth, browserLocalPersistence);
