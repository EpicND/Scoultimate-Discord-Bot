import { EmbedBuilder } from "discord.js";
import { LoadingEmbed } from "../../models/EmbedModels/LoadingEmbedModel";
import { embedConstants } from "../../constants";
import { getStandardEmbed } from "./generate";

/**
 * Generates a loading state embed.
 * @param embedData - The data for the error embed.
 * @returns The generated error embed.
 */
export function generateLoadingEmbed(embedData: LoadingEmbed): EmbedBuilder {
  const embed = getStandardEmbed("Loading", "is Loading Data");

  embed
    .setColor(embedConstants.loadingColor)
    .setTitle("Loading")
    .setDescription(`Loading data for ${embedData.type} ${embedData.key}`);

  return embed;
}
