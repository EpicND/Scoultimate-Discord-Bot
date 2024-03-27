import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { getSubscriptions } from "../../lib/notifications/getSubscriptions";
import { getSubscriptionsEmbed } from "../../lib/embeds/notifications/GetSubscriptionsEmbed";

const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("notifications")
    .setDescription("Shows all the subscribed notifications for this server."),
  async execute(interaction: ChatInputCommandInteraction) {
    const data = await getSubscriptions(interaction.guild!.id);

    const embed = getSubscriptionsEmbed(data);

    interaction.reply({ embeds: [embed] });
  },
};

export default ping;
