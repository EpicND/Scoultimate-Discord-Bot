import { EmbedBuilder } from "discord.js";
import { format } from "date-fns";
import { getStandardEmbed } from "./Generate";
import { embedConstants } from "../../constants";

export interface EventEmbed {
  event_name: string;
  event_type: string;
  key: string;
  week: number;
  start: Date;
  end: Date;
  website?: string;
  top?: {
    1: TeamRank;
    2: TeamRank;
    3: TeamRank;
  };
  country: string;
  location: string;
  address?: string;
}

export interface TeamRank {
  record: {
    w: number;
    l: number;
    t: number;
  };
  team: number | string;
}

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
 * Returns the emoji corresponding to the given country.
 * Only supports the countries where FIRST Events currently occur.
 *
 * If for some reason it's an unexpected country, returns the FIRST logo.
 * @param country - The country for which to get the emoji.
 * @returns The emoji representing the country.
 */
function getCountryEmoji(country: string) {
  switch (country) {
    case "USA":
      return "🇺🇸";
    case "Israel":
      return "🇮🇱";
    case "China":
      return "🇨🇳";
    case "Australia":
      return "🇦🇺";
    default:
      return "<:firstlogo:1193494520613060628>";
  }
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
