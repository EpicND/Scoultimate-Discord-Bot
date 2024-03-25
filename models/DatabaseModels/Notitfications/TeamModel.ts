import { DocumentReference } from "firebase-admin/firestore";

export interface DatabaseTeamModel {
  // firestore references to other documents
  guilds: DocumentReference[];
}
