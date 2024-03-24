import { EmbedBuilder } from "discord.js";
import constants from "../constants";

export function getStandardEmbed(
  command: string,
  purpose: string
): EmbedBuilder {
  const embed = new EmbedBuilder();

  embed.setFooter({
    text: `${command}  •  Scoultimate v${constants.version}`,
    iconURL: constants.bot_logo_url,
  });

  embed.setTimestamp();

  embed.setAuthor({
    name: `${purpose} - Scoultimate`,
  });

  return embed;
}
