import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Tests the ping of the bot."),
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply(
      `Pong 🏓 the latency was ${
        Date.now() - interaction.createdTimestamp
      } milliseconds`
    );
  },
};

export default ping;
