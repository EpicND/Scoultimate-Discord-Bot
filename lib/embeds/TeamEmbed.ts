import constants from "../constants";
import { TeamEmbed } from "../../models/EmbedModels/TeamEmbedModel";
import { getCountryEmoji } from "../getCountryEmoji";
import { getStandardEmbed } from "./generate";
import { setEmbedColor } from "./vibrant";

export async function generateTeamEmbed(embedData: TeamEmbed) {
  const embed = getStandardEmbed("/team", "Team Info");

  const {
    team_name,
    team_number,
    awards,
    years,
    events,
    profiles,
    country,
    city,
    state_prov,
    rookie_year,
    logo_url,
    epa,
  } = embedData;

  embed.setURL(`${constants.tba_base_url}/team/${team_number}`);

  embed.setTitle(`${team_name} - ${team_number}`);

  if (country && city && state_prov) {
    embed.setDescription(
      `${getCountryEmoji(country)} ${city}, ${state_prov}, ${country}`
    );
  }

  embed.addFields({
    name: "**Year EPA**",
    inline: true,
    value: `${epa}`,
  });

  embed.addFields({
    name: "**Awards**",
    inline: true,
    value: `${awards.length}`,
  });

  embed.addFields({
    name: "**Rookie Year**",
    inline: true,
    value: `${rookie_year ? rookie_year : "NA"}`,
  });

  embed.addFields({
    name: "**Events**",
    value: `${
      events.length > 0
        ? events
            .map((event) => {
              return `${event.name} - ${event.key}\n`;
            })
            .join("")
        : "No events this year."
    }`,
  });

  embed.addFields({
    name: "**Team Social Media**",
    value: `${
      profiles.length > 0
        ? profiles
            .map((profile) => {
              return `${profile.service}: [${profile.id}](${profile.url})\n`;
            })
            .join("")
        : "No social media."
    }`,
  });

  embed.setThumbnail(logo_url);

  // used node-vibrant to add color to the embed based on team profile photo.

  setEmbedColor(embed, logo_url, team_number);

  return embed;
}
