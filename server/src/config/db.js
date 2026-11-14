// Connects to firestore and firebase auth  using service account key
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import createDebug from "debug";
import config from "./config.js";

// debug messages show when DEBUG=app* when app runs
const dbStart = createDebug("app:db");

// read as text then parse
const serviceAccount = JSON.parse(
  readFileSync(config.db.serviceAccountKey, "utf-8"),
);

// Start Admin SDK once for the server
initializeApp({
  credential: cert(serviceAccount),
});

// Firestore,auth uses login tokens
// Supabase will store the images
export const db = getFirestore();
export const adminAuth = getAuth();

// small query and if it works the key and project are correct
export const pingDb = db.listCollections().then((collections) => {
  dbStart("Connected To Cloud Firestore");
  collections.forEach((collection) =>
    dbStart(`Found Collection: ${collection.id}`),
  );
});
