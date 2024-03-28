import { TBAMatchScoreNotification } from "../../models/WebhookModels/TBAMatchScoreNotificationModel";
import { TextChannel } from "discord.js";
import { getChannelsForNotifications } from "./getChannelsToSend";
import { client } from "../../bin/bot";
import { get } from "../get";
import { APIMatchSimple } from "../../models/APIModels/TBA/APIMatchSimpleModel";
import { generateMatchScoreEmbed } from "../embeds/notifications/GetMatchScoreEmbed";

/**
 * Processes the upcoming match notification and sends an embed message to the specified channels.
 * @param body - The TBAUpcomingMatchNotification object containing the webhook match data.
 */
export async function processMatchScore(body: TBAMatchScoreNotification) {
  const [channelSet, { alliances, comp_level, winning_alliance }] =
    await Promise.all([
      getChannelsForNotifications(body, body.message_data.match.event_key),

      // get published match data
      get<APIMatchSimple>(`match/${body.message_data.match.key}`),
    ]);

  const embed = generateMatchScoreEmbed({
    event_name: body.message_data.event_name,
    match_number: body.message_data.match.match_number,
    set_number: body.message_data.match.set_number,
    competition_level: comp_level,
    alliances,
    winning_alliance: winning_alliance || "",
  });

  const channels = channelSet.values();

  for (const channel of channels) {
    // undefined check
    if (channel) {
      const resolved = (await client.channels.fetch(channel)) as TextChannel;
      resolved?.send({
        embeds: [embed],
      });
    }
  }
}
