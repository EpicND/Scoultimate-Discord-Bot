import { EmbedBuilder } from "discord.js";

export interface ErrorEmbed {
  error: string;
  errorCode?: number;
}

/**
 * Generates an error embed.
 * @param embedData - The data for the error embed.
 * @returns The generated error embed.
 */
export function generateErrorEmbed(embedData: ErrorEmbed): EmbedBuilder {
  const embed = new EmbedBuilder();

  embed
    .setColor([207, 0, 0])
    .setTitle("❌ Error")
    .setDescription(embedData.error);

  return embed;
}
