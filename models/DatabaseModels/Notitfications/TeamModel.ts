import { DocumentReference } from "firebase-admin/firestore";

export interface DatabaseTeam {
  // firestore references to other documents
  guilds: DocumentReference[];
}
