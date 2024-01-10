import { EmbedBuilder } from "discord.js";
import { getStandardEmbed } from "./Generate";
import { AboutEmbed } from "../../models/EmbedModels/AboutEmbedModel";
import { HSLToRGB } from "../hslToRGB";

export function getAboutEmbed(embedData: AboutEmbed): EmbedBuilder {
  const embed = getStandardEmbed("/about", "Bot Info");

  const { guilds, users, channels, uptime, memory } = embedData;
  const { days, hours, minutes, seconds } = uptime;

  const val = (512 * 512) / (memory * memory);

  var [r, g, b] = HSLToRGB(val, 95, 63);

  embed.addFields(
    {
      name: `Guilds`,
      value: `${guilds}`,
      inline: true,
    },
    {
      name: `Users`,
      value: `${users}`,
      inline: true,
    },
    {
      name: `Channels`,
      value: `${channels}`,
      inline: true,
    },
    {
      name: `Bot Uptime`,
      value: `${days}d, ${hours}h, ${minutes}m, ${seconds}s `,
      inline: true,
    },
    {
      name: `Memory Usage`,
      value: `${memory} MB`,
      inline: true,
    }
    // { name: `Commands Used`, value: `${usedCommands}`, inline: false }
  );

  embed.setColor([r, g, b]);

  return embed;
}
