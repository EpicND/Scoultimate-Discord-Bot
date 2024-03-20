import { EmbedBuilder } from "discord.js";
import { getStandardEmbed } from "./generate";
import { AboutEmbed } from "../../models/EmbedModels/AboutEmbedModel";
import { HSLToRGB } from "../hslToRGB";

export function getAboutEmbed(embedData: AboutEmbed): EmbedBuilder {
  const embed = getStandardEmbed("/about", "Bot Info");

  const { guilds, users, channels, uptime, memory, commandsUsed } = embedData;
  const { days, hours, minutes, seconds } = uptime;

  const val = (128 * 128) / (memory * memory);

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
    },
    { name: `Commands Used`, value: `${commandsUsed}`, inline: false },
    {
      name: "Contributing",
      value:
        "Scoultimate is now Open Source! Help contribute to Scoultimate on [GitHub](https://www.github.com/epicnd/Scoultimate-Discord-Bot).",
    }
  );

  embed.setColor([r, g, b]);

  return embed;
}
