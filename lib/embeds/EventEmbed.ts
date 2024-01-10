import { EmbedBuilder } from "discord.js";
import { format } from "date-fns";
import { getStandardEmbed } from "./Generate";
import { embedConstants } from "../../constants";
import { getCountryEmoji } from "../getCountryEmoji";
import { EventEmbed, TeamRank } from "../../models/EmbedModels/EventEmbedModel";

/**
 * Generates an event embed based on the provided data.
 * @param embedData - The data used to populate the event embed.
 * @returns The generated event embed builder.
 */
export function generateEventEmbed(embedData: EventEmbed): EmbedBuilder {
  const embed = getStandardEmbed("/event", "Event Info");

  embed
    .setTitle(`${embedData.event_name} - ${embedData.key}`)
    .setDescription(
      `**${getCountryEmoji(embedData.country)} ${embedData.location} - Week ${
        embedData.week != -2 ? embedData.week : "NA"
      } Event** \n${format(embedData.start, "PPPP")} - ${format(
        embedData.end,
        "PPPP"
      )}`
    );

  if (embedData.top) {
    embed.addFields({
      name: "Top 3",
      value: `:first_place: ${embedData.top[1].team} (${getTeamRecordAsString(
        embedData.top[1]
      )}) :second_place: ${embedData.top[2].team} (${getTeamRecordAsString(
        embedData.top[2]
      )}) :third_place: ${embedData.top[3].team} (${getTeamRecordAsString(
        embedData.top[3]
      )})`,
      inline: true,
    });
  }

  if (embedData.website) {
    embed.addFields({ name: "Event Website", value: `${embedData.website}` });
  }

  if (embedData.address) {
    embed.addFields({ name: "Location", value: embedData.address });
  }

  embed.setColor(embedConstants.eventColor);

  return embed;
}

/**
 * Returns the team record as a string in the format "w-l-t".
 * @param ranking - The team ranking object.
 * @returns The team record as a string.
 */
function getTeamRecordAsString(ranking: TeamRank) {
  const { w, l, t } = ranking.record;
  return `${w}-${l}-${t}`;
}
