import { EmbedBuilder } from "discord.js";
import { format } from "date-fns";

export interface EventEmbed {
  event_name: string;
  event_type: string;
  key: string;
  week: number;
  start: Date;
  end: Date;
  website?: string;
  country: string;
  location: string;
}

/**
 * Generates an event embed based on the provided data.
 * @param embedData - The data used to populate the event embed.
 * @returns The generated event embed builder.
 */
export function generateEventEmbed(embedData: EventEmbed): EmbedBuilder {
  const embed = new EmbedBuilder();

  embed
    .setTitle(`${embedData.event_name} - ${embedData.key}`)
    .setDescription(
      `**${getCountryEmoji(embedData.country)} ${embedData.location} - Week ${
        embedData.week
      } ${embedData.event_type} Event** \n${format(
        embedData.start,
        "PPPP"
      )} - ${format(embedData.end, "PPPP")}`
    );

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
    default:
      return "<:firstlogo:1193494520613060628>";
  }
}
