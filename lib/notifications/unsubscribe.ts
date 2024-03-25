import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firebase";

export async function unsubscribeFromEvent(guild: string, event: string) {
  const guildRef = db
    .collection("bot")
    .doc("notifications")
    .collection("guilds")
    .doc(guild);

  const eventRef = db
    .collection("bot")
    .doc("notifications")
    .collection("events")
    .doc(event);

  await db.runTransaction(async (transaction) => {
    transaction.update(guildRef, {
      [`events.${event}`]: FieldValue.delete(),
    });

    transaction.update(eventRef, {
      guilds: FieldValue.arrayRemove(guild),
    });
  });
}

export async function unsubscribeFromTeam(
  guild: string,
  team: string | number
) {
  const teamStr = typeof team == "string" ? team : `${team}`;

  const guildRef = db
    .collection("bot")
    .doc("notifications")
    .collection("guilds")
    .doc(guild);

  const teamRef = db
    .collection("bot")
    .doc("notifications")
    .collection("teams")
    .doc(teamStr);

  await db.runTransaction(async (transaction) => {
    transaction.update(guildRef, {
      [`teams.${teamStr}`]: FieldValue.delete(),
    });

    transaction.update(teamRef, {
      guilds: FieldValue.arrayRemove(guildRef),
    });
  });
}
