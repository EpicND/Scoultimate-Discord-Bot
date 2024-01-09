import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team")
    .setDescription("Retrieves the data for a specific team.")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("The FIRST team key of the team you are requesting.")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const key = interaction.options.get("key")?.value as string;
  },
};
