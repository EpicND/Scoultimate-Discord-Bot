import {
  AutocompleteInteraction,
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { SlashCommand } from "../../types";
import { generateErrorEmbed } from "../../lib/embeds/ErrorEmbed";
import { verifyEvent } from "../../lib/verify/event";
import { TeamAutocomplete } from "../../lib/autocomplete/teamAutocomplete";
import { EventAutocomplete } from "../../lib/autocomplete/eventAutocomplete";

const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription("Enables notifications for a channel or team.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "The Discord Channel you want match notifications for this team or event to be sent to."
        )
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("team")
        .setAutocomplete(true)
        .setDescription("The team you want notifications for")
    )
    .addStringOption((option) =>
      option
        .setName("event")
        .setAutocomplete(true)
        .setDescription("The event you want notifications for")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction: ChatInputCommandInteraction) {
    const team = interaction.options.get("team")?.value as string;
    const event = interaction.options.get("event")?.value as string;
    const channel = interaction.options.getChannel("channel") as TextChannel;

    if (!team && !event) {
      interaction.reply({
        embeds: [
          generateErrorEmbed({
            error: "Missing team or event to enable notifications for",
            command: "/subscribe",
          }),
        ],
      });

      return;
    }

    if (event && team) {
      interaction.reply({
        embeds: [
          generateErrorEmbed({
            error:
              "Cannot set notifications for team and event at once. Please run the command twice with different arguments.",
            command: "/subscribe",
          }),
        ],
      });

      return;
    }

    if (event) {
      // if its an event passed through
      console.log("running");
      if (!(await verifyEvent(event))) {
        interaction.reply("Error, invalid event key");
        return;
      }
    }

    interaction.reply(`Not fully implemented: ${interaction.guildId}`);
  },

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused(true);

    const team = interaction.options.getNumber("team") || "";
    const event = interaction.options.getString("event") || "";

    try {
      if (focusedValue.name == "team") {
        interaction.respond(await TeamAutocomplete(team));
      } else if (focusedValue.name == "event") {
        const data = await EventAutocomplete(event, 24);
        data.unshift({
          name: "All Events (Will send every notification received for every event)",
          value: "all",
        });

        interaction.respond(data);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export default ping;
