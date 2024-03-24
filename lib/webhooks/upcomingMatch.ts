import { TextChannel } from "discord.js";
import { TBAUpcomingMatchNotification } from "../../models/WebhookModels/TBAUpcomingMatchNotificationModel";
import { getChannelsForNotifications } from "./getChannelsToSend";
import { client } from "../../bin/bot";
import { get } from "../get";
import { APIMatchSimple } from "../../models/APIModels/TBA/APIMatchSimpleModel";
import { APIEvent } from "../../models/APIModels/TBA/APIEventModel";
import { generateUpcomingEventEmbed } from "../embeds/notifications/UpcomingEventEmbed";

/**
 * Processes the upcoming match notification and sends an embed message to the specified channels.
 * @param body - The TBAUpcomingMatchNotification object containing the webhook match data.
 */
export async function processUpcomingMatch(body: TBAUpcomingMatchNotification) {
  const [channelSet, { match_number, alliances, comp_level }, { timezone }] =
    await Promise.all([
      getChannelsForNotifications(body),

      // get published match data
      get<APIMatchSimple>(`match/${body.message_data.match_key}`),
      get<APIEvent>(`event/${body.message_data.event_key}`),
    ]);

  const embed = generateUpcomingEventEmbed({
    alliances,
    competition_level: comp_level,
    event_name: body.message_data.event_name,
    match_number,
    predicted_time: body.message_data.predicted_time,
    scheduled_time: body.message_data.scheduled_time,
    timezone: timezone || "America/Chicago",
  });

  const channels = channelSet.values();

  for (const channel of channels) {
    const resolved = (await client.channels.fetch(channel)) as TextChannel;
    resolved?.send({
      embeds: [embed],
    });
  }
}
