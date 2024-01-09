import { EmbedBuilder } from "discord.js";
import constants from "../../constants";

export function getStandardEmbed(command: string): EmbedBuilder {
  const embed = new EmbedBuilder();

  embed.setFooter({ text: `${command}  •  Scoultimate v${constants.version}` });

  embed.setTimestamp();

  embed.setAuthor({
    name: "Scoultimate",
    iconURL: constants.bot_logo_url,
  });

  return embed;
}
