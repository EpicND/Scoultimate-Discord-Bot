import { App, cert } from "firebase-admin/app";
import * as admin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const app: App = admin.initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

export const db = getFirestore(app);

export async function incrementTotalCalls(cmd: string) {
  const ref = db.collection("bot").doc("statistics");
  await ref.update({
    total_cmd_used: FieldValue.increment(1),
    [cmd]: FieldValue.increment(1),
  });
}

export async function getTotalCommandsUsed(): Promise<number> {
  const ref = db.collection("bot").doc("statistics");
  const doc = (await ref.get()).data();

  return doc?.total_cmd_used || 0;
}
