import { EmbedBuilder } from "discord.js";
import { embedConstants } from "../../constants";

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
    .setColor(embedConstants.errorColor)
    .setTitle("❌ Error")
    .setDescription(embedData.error);

  return embed;
}
