import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getAboutEmbed } from "../../lib/embeds/AboutEmbed";
import { SlashCommand } from "../../types";
import { getTotalCommandsUsed } from "../../lib/firebase";

const about: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Retrieves information about Scoultimate!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const uptimeAsDate = new Date(process.uptime() * 1000);

    let totalUsers = 0;

    for (let guild in interaction.client.guilds.cache) {
      totalUsers +=
        interaction.client.guilds.cache.get(guild)?.memberCount || 0;
    }
    const embed = getAboutEmbed({
      guilds: interaction.client.guilds.cache.size,
      channels: interaction.client.channels.cache.size,
      users: totalUsers,
      uptime: {
        days: uptimeAsDate.getUTCDay() - 4,
        hours: uptimeAsDate.getUTCHours(),
        minutes: uptimeAsDate.getUTCMinutes(),
        seconds: uptimeAsDate.getUTCSeconds(),
      },
      memory:
        Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
      commandsUsed: await getTotalCommandsUsed(),
    });

    interaction.reply({ embeds: [embed] });
  },
};

export default about;
