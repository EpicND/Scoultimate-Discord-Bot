import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { get } from "../../lib/get";
import { APITeam } from "../../models/APIModels/APITeamModel";
import { APITeamSocialMedia } from "../../models/APIModels/APITeamSocialMediaModel";
import { APITeamAward } from "../../models/APIModels/APITeamAwardModel";
import { generateTeamEmbed } from "../../lib/embeds/TeamEmbed";
import { APITeamEvent } from "../../models/APIModels/APITeamEvent";
import constants from "../../constants";
import { generateLoadingEmbed } from "../../lib/embeds/LoadingEmbed";
import { getSocialMediaProfile } from "../../lib/getSocialMediaProfile";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team")
    .setDescription("Retrieves the data for a specific team.")
    .addStringOption((option) =>
      option
        .setName("number")
        .setDescription("The team number of the FRC team you are requesting.")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const key = interaction.options.get("number")?.value as string;

    await interaction.reply({
      embeds: [generateLoadingEmbed({ key, type: "Team" })],
    });

    const embed = await retrieveEmbed(key);

    interaction.editReply({ embeds: [embed] });
  },
};

async function retrieveEmbed(team: number | string): Promise<EmbedBuilder> {
  const { country, city, state_prov, nickname, name, rookie_year } =
    await get<APITeam>(`team/frc${team}`);

  const socialMedia = await get<APITeamSocialMedia[]>(
    `team/frc${team}/social_media`
  );
  console.log(socialMedia);

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
