import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pong")
    .setDescription("Tests the ping of the bot."),
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply(
      `Pong 🏓 the latency was ${
        Date.now() - interaction.createdTimestamp
      } milliseconds`
    );
  },
};
