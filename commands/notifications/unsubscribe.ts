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
import {
  subscribeToEvent,
  subscribeToTeam,
} from "../../lib/notifications/subscribe";
import { verifyTeam } from "../../lib/verify/team";
import {
  unsubscribeFromEvent,
  unsubscribeFromTeam,
} from "../../lib/notifications/unsubscribe";
import { getSuccessfulUnsubscribeEmbed } from "../../lib/embeds/notifications/GetSuccessfulEmbed";
import { getSubscriptionsEmbedFromGuildId } from "../../lib/embeds/notifications/GetSubscriptionsEmbed";

const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("unsubscribe")
    .setDescription("Removes notifications for a channel or team.")
    .addNumberOption((option) =>
      option
        .setName("team")
        .setAutocomplete(true)
        .setDescription("The team you want notifications disabled for")
    )
    .addStringOption((option) =>
      option
        .setName("event")
        .setAutocomplete(true)
        .setDescription("The event you want notifications disabled for")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction: ChatInputCommandInteraction) {
    const team = interaction.options.getNumber("team");
    const event = interaction.options.get("event")?.value as string;

    if (!team && !event) {
      interaction.reply({
        embeds: [
          generateErrorEmbed({
            error: "Missing team or event to disable notifications for",
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
              "Cannot remove notifications for team and event at once. Please run the command twice with different arguments.",
            command: "/subscribe",
          }),
        ],
      });

      return;
    }

    if (event) {
      // if its an event passed through
      if (!(await verifyEvent(event)) && event.toLowerCase() != "all") {
        interaction.reply({
          embeds: [
            generateErrorEmbed({
              error:
                "Invalid event key. Make sure the event you provided exists.",
              command: "/subscribe",
            }),
          ],
        });

        return;
      }

      await unsubscribeFromEvent(interaction.guildId!, event);
    }

    if (team) {
      if (!(await verifyTeam(team))) {
        interaction.reply({
          embeds: [
            generateErrorEmbed({
              error:
                "Invalid event key. Make sure the event you provided exists.",
              command: "/subscribe",
            }),
          ],
        });

        return;
      }

      await unsubscribeFromTeam(interaction.guildId!, team);
    }

    interaction.reply({
      embeds: [
        getSuccessfulUnsubscribeEmbed(),
        await getSubscriptionsEmbedFromGuildId(interaction.guild?.id!),
      ],
    });
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
