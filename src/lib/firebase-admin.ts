import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (privateKey && privateKey.includes("BEGIN PRIVATE KEY")) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fasih-bhai-project",
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
          privateKey: privateKey,
        }),
      });
    }
  } catch (error) {
    console.warn("Firebase Admin server initialization fallback.");
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
