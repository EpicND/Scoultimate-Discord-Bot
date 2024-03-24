import { DocumentReference } from "firebase-admin/firestore";

export interface DatabaseEventModel {
  // firestore references to other documents
  guilds: DocumentReference[];
}
