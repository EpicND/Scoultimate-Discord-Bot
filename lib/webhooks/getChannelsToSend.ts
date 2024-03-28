import { DatabaseEvent } from "../../models/DatabaseModels/Notitfications/EventModel";
import { DatabaseGuild } from "../../models/DatabaseModels/Notitfications/GuildModel";
import { DatabaseTeam } from "../../models/DatabaseModels/Notitfications/TeamModel";
import { WebhookTypes } from "../../models/WebhookModels/GeneralWebhookModel";
import { TBAMatchScoreNotification } from "../../models/WebhookModels/TBAMatchScoreNotificationModel";
import { TBAUpcomingMatchNotification } from "../../models/WebhookModels/TBAUpcomingMatchNotificationModel";
import { db } from "../firebase";

export async function getChannelsForNotifications(
  data: TBAUpcomingMatchNotification | TBAMatchScoreNotification,
  event_key: string
): Promise<Set<string>> {
  const channels = new Set<string>();

  (await getChannelsForNotificationsFromEventKey(event_key)).forEach(
    (channel) => channels.add(channel)
  );

  (await getChannelsForNotificationsFromEventKey("all")).forEach((channel) =>
    channels.add(channel)
  );

  // add all teams
  let team_keys =
    data.message_type == WebhookTypes.UPCOMING_MATCH
      ? (data as TBAUpcomingMatchNotification).message_data.team_keys
      : [
          ...((data as TBAMatchScoreNotification).message_data.match.alliances
            ?.blue.team_keys || []),

          ...((data as TBAMatchScoreNotification).message_data.match.alliances
            ?.red.team_keys || []),
        ];

  for (let i = 0; i < team_keys.length; i++) {
    (
      await getChannelsForNotificationsFromTeamNumber(
        team_keys[i].replace("frc", "")
      )
    ).forEach((channel) => channels.add(channel));
  }

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
