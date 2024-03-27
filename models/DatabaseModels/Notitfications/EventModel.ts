import { DocumentReference } from "firebase-admin/firestore";

export interface DatabaseEvent {
  // firestore references to other documents
  guilds: DocumentReference[];
}
