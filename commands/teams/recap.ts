import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { TeamAutocomplete } from "../../lib/autocomplete/teamAutocomplete";
import { TeamYearAutocomplete } from "../../lib/autocomplete/teamYearAutocomplete";
import { getMaxYear } from "../../lib/get";
import { SlashCommand } from "../../types";
import { generateLoadingEmbed } from "../../lib/embeds/LoadingEmbed";

const recap = {
  // TODO -- IMPLEMENT EXECUTE
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
      option
        .setName("year")
        .setDescription("The year you want recap data of.")
        .setAutocomplete(true)
    ),

  // async execute(interaction: ChatInputCommandInteraction) {
  //   const team = interaction.options.getNumber("team");
  //   const year = interaction.options.getNumber("year") || (await getMaxYear());

  //   interaction.reply({
  //     embeds: [
  //       generateLoadingEmbed({
  //         key: `${team} for ${year}`,
  //         type: "Season Recap",
  //       }),
  //     ],
  //   });
  // },

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused(true);

    const team = interaction.options.getNumber("team") || 0;
    const year = interaction.options.getNumber("year") || undefined;

    try {
      if (focusedValue.name == "team") {
        interaction.respond(await TeamAutocomplete(focusedValue.value));
      } else if (focusedValue.name == "year") {
        interaction.respond(await TeamYearAutocomplete(team, year));
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export default recap;
