// Connects to firestore and firebase auth  using service account key
import admin from "firebase-admin";
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
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore,auth uses login tokens
// Supabase will store the images
export const db = admin.firestore();
export const adminAuth = admin.auth();

// small query and if it works the key and project are correct
export const pingDb = db.listCollections().then((collections) => {
  dbStart("Connected To Cloud Firestore");
  collections.forEach((collection) =>
    dbStart(`Found Collection: ${collection.id}`),
  );
});
