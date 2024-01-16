import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { get } from "../../lib/get";
import { generateEventEmbed } from "../../lib/embeds/EventEmbed";
import { APIEvent } from "../../models/APIModels/TBA/APIEventModel";
import { generateLoadingEmbed } from "../../lib/embeds/LoadingEmbed";
import { generateErrorEmbed } from "../../lib/embeds/ErrorEmbed";
import { APIEventRankings } from "../../models/APIModels/TBA/APIEventRankingsModel";
import constants from "../../constants";
import { EventAutocomplete } from "../../lib/autocomplete/eventAutocomplete";
import { SlashCommand } from "../../types";

const event: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Retrieves the data for an event.")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("The FIRST event key of the event you are requesting.")
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const key = interaction.options.get("key")?.value as string;

    await interaction.reply({
      embeds: [generateLoadingEmbed({ type: "Event", key })],
    });

    try {
      const embed = await retrieveEmbed(key);
      interaction.editReply({ embeds: [embed] });
    } catch (e) {
      console.error(e);

      const embed = generateErrorEmbed({
        error: `Error loading data. Please make sure ${key} is a valid event key.`,
        command: "/event",
      });

      interaction.editReply({
        embeds: [embed],
      });
    }
  },

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();

    try {
      interaction.respond(await EventAutocomplete(focusedValue)).catch();
    } catch (e) {
      console.error(e);
    }
  },
};

/**
 * Retrieves an embed for a specific event.
 * @param key - The key of the event.
 * @returns The embed for the event.
 */
async function retrieveEmbed(key: string): Promise<EmbedBuilder> {
  const data = await get<APIEvent>(`event/${key}`);

  const rankings = await get<APIEventRankings>(`event/${key}/rankings`);

  const {
    name,
    event_type,
    week,
    state_prov,
    website,
    city,
    country,
    start_date,
    end_date,
    gmaps_url,
    event_type_string,
  } = data;

  const embed = generateEventEmbed({
    event_name: name,
    event_type: event_type_string,
    key: key,
    week: week !== null && week !== undefined ? week + 1 : -2,
    start: new Date(start_date),
    end: new Date(end_date),
    website: website,
    country: country || "NA",
    location:
      city && state_prov && country
        ? `${city}, ${state_prov}, ${country}`
        : "Location unavailable.",
    top: getTopTeams(rankings),
    address: gmaps_url,
  });

  embed.setURL(`${constants.tba_base_url}/event/${key}`);

  return embed;
}

function getTopTeams(rankingData: APIEventRankings) {
  if (rankingData == null || rankingData == undefined) return undefined;
  if (!rankingData.rankings || rankingData.rankings.length == 0)
    return undefined;

  const rankings = rankingData.rankings;

  return {
    1: {
      record: {
        w: rankings[0].record?.wins || 0,
        l: rankings[0].record?.losses || 0,
        t: rankings[0].record?.ties || 0,
      },
      team: rankings[0].team_key.substring(3),
    },
    2: {
      record: {
        w: rankings[1].record?.wins || 0,
        l: rankings[1].record?.losses || 0,
        t: rankings[1].record?.ties || 0,
      },
      team: rankings[1].team_key.substring(3),
    },
    3: {
      record: {
        w: rankings[2].record?.wins || 0,
        l: rankings[2].record?.losses || 0,
        t: rankings[2].record?.ties || 0,
      },
      team: rankings[2].team_key.substring(3),
    },
  };
}

export default event;
