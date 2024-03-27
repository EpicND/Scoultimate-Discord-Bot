import { DatabaseEvent } from "../../models/DatabaseModels/Notitfications/EventModel";
import { DatabaseGuild } from "../../models/DatabaseModels/Notitfications/GuildModel";
import { DatabaseTeam } from "../../models/DatabaseModels/Notitfications/TeamModel";
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

  // add all teams
  for (let i = 0; i < data.message_data.team_keys.length; i++) {
    (
      await getChannelsForNotificationsFromTeamNumber(
        data.message_data.team_keys[i].replace("frc", "")
      )
    ).forEach((channel) => channels.add(channel));
  }

  console.log(channels);
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

  const data = (await eventRef.get()).data() as DatabaseEvent;

  // No followers of the event in the database
  if (!data) {
    return [];
  }

  // get documents for all the refs
  const newRefs = data.guilds;

  const channels: string[] = [];

  for (let i = 0; i < newRefs.length; i++) {
    const guildData = (await newRefs[i].get()).data() as DatabaseGuild;

    // if there for some reason is an issue with the database storage, we'll just continue to the next object
    if (!guildData) {
      continue;
    }

    // add the channel
    channels.push(guildData.events[key]);
  }

  return channels;
}

async function getChannelsForNotificationsFromTeamNumber(
  team: string
): Promise<string[]> {
  const teamRef = db
    .collection("bot")
    .doc("notifications")
    .collection("teams")
    .doc(team);

  const data = (await teamRef.get()).data() as DatabaseTeam;
  // No followers of the event in the database
  if (!data) {
    return [];
  }

  // get documents for all the refs
  const newRefs = data.guilds;

  const channels: string[] = [];

  for (let i = 0; i < newRefs.length; i++) {
    const guildData = (await newRefs[i].get()).data() as DatabaseGuild;

    // if there for some reason is an issue with the database storage, we'll just continue to the next object
    if (!guildData) {
      continue;
    }

    // add the channel
    channels.push(guildData.teams[team]);
  }

  return channels;
}
