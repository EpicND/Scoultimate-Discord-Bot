import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { get } from "../../lib/get";
import { generateEventEmbed } from "../../lib/embeds/EventEmbed";
import { APIEvent } from "../../models/APIModels/APIEventModel";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Retrieves the data for an event.")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("The event key of the event you want to see.")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("Loading event...");

    const key = interaction.options.get("key")?.value as string;

    const data = await get<APIEvent>(`event/${key}/simple`);

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
      district, // Handle optional district separately
    } = data;

    const embed = generateEventEmbed({
      event_name: name,
      event_type: "Regional",
      key: key,
      week: week || -1,
      start: new Date(start_date),
      end: new Date(end_date),
      website: website,
      country: country || "NA",
      location:
        city && state_prov ? `${city}, ${state_prov}` : "Location unavailable.",
    });

    interaction.editReply({ embeds: [embed] });
  },
};
