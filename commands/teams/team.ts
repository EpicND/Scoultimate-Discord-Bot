import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { get } from "../../lib/get";
import { APITeam } from "../../models/APIModels/APITeamModel";
import { APITeamSocialMedia } from "../../models/APIModels/APITeamSocialMediaModel";
import { APITeamAward } from "../../models/APIModels/APITeamAwardModel";
import { generateTeamEmbed } from "../../lib/embeds/TeamEmbed";
import { APITeamEvent } from "../../models/APIModels/APITeamEventModel";
import constants from "../../constants";
import { generateLoadingEmbed } from "../../lib/embeds/LoadingEmbed";
import { getSocialMediaProfile } from "../../lib/getSocialMediaProfile";
import { TeamAutocomplete } from "../../lib/autocomplete/teamAutocomplete";
import { generateErrorEmbed } from "../../lib/embeds/ErrorEmbed";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team")
    .setDescription("Retrieves the data for a specific team.")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("The team number of the FRC team you are requesting.")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const key = interaction.options.get("number")?.value as number;

    await interaction.reply({
      embeds: [generateLoadingEmbed({ key, type: "Team" })],
    });

    try {
      const embed = await retrieveEmbed(key);
      interaction.editReply({ embeds: [embed] });
    } catch (e) {
      console.error(e);

      const embed = generateErrorEmbed({
        error: `Error loading data. Please make sure ${key} is a valid team number.`,
        command: "/team",
      });

      interaction.editReply({
        embeds: [embed],
      });
    }
  },

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();

    try {
      interaction.respond(await TeamAutocomplete(focusedValue)).catch();
    } catch (e) {
      console.error(e);
    }
  },
};

async function retrieveEmbed(team: number | string): Promise<EmbedBuilder> {
  const { country, city, state_prov, nickname, name, rookie_year } =
    await get<APITeam>(`team/frc${team}`);

  const socialMedia = await get<APITeamSocialMedia[]>(
    `team/frc${team}/social_media`
  );

  const awards = await get<APITeamAward[]>(`team/frc${team}/awards`);
  const events = await get<APITeamEvent[]>(
    `team/frc${team}/events/${new Date().getFullYear()}`
  );

  const embed = await generateTeamEmbed({
    team_name: nickname || name,
    awards,
    team_number: team,
    years: [],
    events,
    rookie_year,
    country,
    city,
    state_prov,
    logo_url: `${constants.cloudinary_bucket_url}/${team}.png`,
    profiles: socialMedia.map((value) => {
      return getSocialMediaProfile(value);
    }),
  });

  return embed;
}
