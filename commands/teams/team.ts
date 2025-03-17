import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { get, getMaxYear } from "../../lib/get";
import { APITeam } from "../../models/APIModels/TBA/APITeamModel";
import { APITeamSocialMedia } from "../../models/APIModels/TBA/APITeamSocialMediaModel";
import { APITeamAward } from "../../models/APIModels/TBA/APITeamAwardModel";
import { generateTeamEmbed } from "../../lib/embeds/TeamEmbed";
import { APITeamEvent } from "../../models/APIModels/TBA/APITeamEventModel";
import constants from "../../lib/constants";
import { generateLoadingEmbed } from "../../lib/embeds/LoadingEmbed";
import { getSocialMediaProfile } from "../../lib/getSocialMediaProfile";
import { TeamAutocomplete } from "../../lib/autocomplete/teamAutocomplete";
import { generateErrorEmbed } from "../../lib/embeds/ErrorEmbed";
import { SlashCommand } from "../../types";
import { APITeamStatbotics } from "../../models/APIModels/Statbotics/APITeamModel";

const team: SlashCommand = {
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
      interaction.editReply({ embeds: [await retrieveEmbed(key)] });
    } catch (e) {
      console.error(e);

      interaction.editReply({
        embeds: [
          generateErrorEmbed({
            error: `Error loading data. Please make sure ${key} is a valid team number.`,
            command: "/team",
          }),
        ],
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
  const maxYear = await getMaxYear();
  const [
    { country, city, state_prov, nickname, name, rookie_year },
    socialMedia,
    awards,
    events,
    { epa },
  ] = await Promise.all([
    get<APITeam>(`team/frc${team}`),
    get<APITeamSocialMedia[]>(`team/frc${team}/social_media`),
    get<APITeamAward[]>(`team/frc${team}/awards`),
    get<APITeamEvent[]>(`team/frc${team}/events/${maxYear}`),
    get<APITeamStatbotics>(`team_year/${team}/${maxYear}`, "Statbotics").catch(
      () => ({
        epa: { total_points: { mean: 0 }, ranks: { total: { rank: "NA" } } },
      })
    ),
  ]);

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
    epa: `${epa.total_points.mean.toFixed(2)} (Rank ${epa.ranks.total.rank})`,
  });

  return embed;
}

export default team;
