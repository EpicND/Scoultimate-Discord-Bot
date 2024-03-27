import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { getSubscriptionsEmbedFromGuildId } from "../../lib/embeds/notifications/GetSubscriptionsEmbed";

const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("notifications")
    .setDescription("Shows all the subscribed notifications for this server."),
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [await getSubscriptionsEmbedFromGuildId(interaction.guild?.id!)],
    });
  },
};

export default ping;
