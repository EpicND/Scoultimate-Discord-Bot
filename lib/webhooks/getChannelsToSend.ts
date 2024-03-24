import { DatabaseEventModel } from "../../models/DatabaseModels/Notitfications/EventModel";
import { GuildModel } from "../../models/DatabaseModels/Notitfications/GuildModel";
import { TBAUpcomingMatchNotification } from "../../models/WebhookModels/TBAUpcomingMatchNotificationModel";
import { db } from "../firebase";

export async function getChannelsForNotifications(
  data: TBAUpcomingMatchNotification
): Promise<Set<string>> {
  const channels = new Set<string>();

  (
    await getChannelsForNotificationsFromEventKey(data.message_data.event_key)
  ).forEach((channel) => channels.add(channel));

  (await getChannelsForNotificationsFromEventKey("all")).forEach((channel) =>
    channels.add(channel)
  );

  return channels;
}

async function getChannelsForNotificationsFromEventKey(
  key: string
): Promise<string[]> {
  const eventRef = db
    .collection("bot")
    .doc("notifications")
    .collection("events")
    .doc(key);

  const data = (await eventRef.get()).data() as DatabaseEventModel;

  // No followers of the event in the database
  if (!data) {
    return [];
  }

  // get documents for all the refs
  const newRefs = data.guilds;

  const channels: string[] = [];

  for (let i = 0; i < newRefs.length; i++) {
    const guildData = (await newRefs[i].get()).data() as GuildModel;

    // if there for some reason is an issue with the database storage, we'll just continue to the next object
    if (!guildData) {
      continue;
    }

    // add the channel
    channels.push(guildData.events[key]);
  }

  return channels;
}
