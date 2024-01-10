import { EmbedBuilder } from "discord.js";
import { LoadingEmbed } from "../../models/EmbedModels/LoadingEmbedModel";
import { embedConstants } from "../../constants";

/**
 * Generates a loading state embed.
 * @param embedData - The data for the error embed.
 * @returns The generated error embed.
 */
export function generateLoadingEmbed(embedData: LoadingEmbed): EmbedBuilder {
  const embed = new EmbedBuilder();

  embed
    .setColor(embedConstants.loadingColor)
    .setTitle("Loading")
    .setDescription(`Loading data for ${embedData.type} ${embedData.key}`);

  return embed;
}
