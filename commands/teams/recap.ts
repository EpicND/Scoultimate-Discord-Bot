import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { TeamAutocomplete } from "../../lib/autocomplete/teamAutocomplete";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recap")
    .setDescription("Provides a recap of a team's season in a given year.")
    .addNumberOption((option) =>
      option
        .setDescription("The team number of the FRC team you are requesting.")
        .setName("team")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("year").setDescription("The year you want recap data of.")
    ),

  async execute(interaction: ChatInputCommandInteraction) {},

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();

    interaction.respond(await TeamAutocomplete(focusedValue));
  },
};
