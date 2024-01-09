import { EmbedBuilder } from "discord.js";

export interface LoadingEmbed {
  key: string;
  type: "Event" | "Team";
}

/**
 * Generates a loading state embed.
 * @param embedData - The data for the error embed.
 * @returns The generated error embed.
 */
export function generateLoadingEmbed(embedData: LoadingEmbed): EmbedBuilder {
  const embed = new EmbedBuilder();

  embed
    .setColor([50, 137, 68])
    .setTitle("Loading")
    .setDescription(`Loading data for ${embedData.type} ${embedData.key}`);

  return embed;
}
