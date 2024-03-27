import { DatabaseGuild } from "../../models/DatabaseModels/Notitfications/GuildModel";
import { db } from "../firebase";

export async function getSubscriptions(
  id: string
): Promise<DatabaseGuild | undefined> {
  const guildRef = db
    .collection("bot")
    .doc("notifications")
    .collection("guilds")
    .doc(id);

  const data = (await guildRef.get()).data() as DatabaseGuild;

  if (!data) {
    return undefined;
  }

  return data;
}
