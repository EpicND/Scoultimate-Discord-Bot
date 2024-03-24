import {
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../types";
import { generateErrorEmbed } from "../../lib/embeds/ErrorEmbed";

const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription("Enables notifications for a channel or team.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "The Discord Channel you want match notifications for this team or event to be sent to."
        )
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("team")
        .setDescription("The team you want notifications for")
    )
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The event you want notifications for")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction: ChatInputCommandInteraction) {
    const team = interaction.options.get("team")?.value as string;
    const event = interaction.options.get("event")?.value as string;

    if (!team && !event) {
      interaction.reply({
        embeds: [
          generateErrorEmbed({
            error: "Missing team or event to enable notifications for",
            command: "/subscribe",
          }),
        ],
      });

      return;
    }

    if (event && team) {
      interaction.reply({
        embeds: [
          generateErrorEmbed({
            error:
              "Cannot set notifications for team and event at once. Please run the command twice with different arguments.",
            command: "/subscribe",
          }),
        ],
      });

      return;
    }

    interaction.reply(`Not fully implemented: ${interaction.guildId}`);
  },
};

export default ping;
