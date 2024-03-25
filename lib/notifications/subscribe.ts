import { db } from "../firebase";

export async function subscribeToEvent(
  guild: string,
  channel: string,
  event: string
) {
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
    transaction.set(
      guildRef,
      {
        events: {
          [event]: channel,
        },
      },
      {
        merge: true,
      }
    );

    transaction.set(eventRef, { guilds: [guildRef] }, { merge: true });
  });
}
export async function subscribeToTeam(
  guild: string,
  channel: string,
  team: string | number
) {
  const teamStr = typeof team == "string" ? team : `${team}`;
  const guildRef = db
    .collection("bot")
    .doc("notifications")
    .collection("guilds")
    .doc(guild);

  const teamsRef = db
    .collection("bot")
    .doc("notifications")
    .collection("teams")
    .doc(teamStr);

  await db.runTransaction(async (transaction) => {
    transaction.set(
      guildRef,
      {
        teams: {
          [team]: channel,
        },
      },
      {
        merge: true,
      }
    );

    transaction.set(teamsRef, { guilds: [guildRef] }, { merge: true });
  });
}
