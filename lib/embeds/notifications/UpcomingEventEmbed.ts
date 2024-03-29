import { format } from "date-fns";
import { UpcomingMatchNotificationEmbed } from "../../../models/EmbedModels/Notifications/UpcomingEventEmbedModel";
import {
  CompetitionLevels,
  CompetitionLevelTextStrings,
} from "../../../models/WebhookModels/CompetitionLevel";
import {
  WebhookNotificationTypesRenderText,
  WebhookTypesRenderText,
} from "../../../models/WebhookModels/GeneralWebhookModel";
import { getStandardEmbed } from "../generate";
import { EmbedBuilder } from "discord.js";
import { embedConstants } from "../../constants";

/**
 * This function is necessary to make the time be localized to the event
 *
 * Stolen from Stackoverflow: https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
 * @param date
 * @param tzString
 * @returns
 */
function convertTZ(date: any, tzString: string) {
  return new Date(
    (typeof date === "string" || typeof date == "number"
      ? new Date(date)
      : date
    ).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export function generateUpcomingMatchEmbed(
  data: UpcomingMatchNotificationEmbed
): EmbedBuilder {
  const embed = getStandardEmbed(
    "Notification",
    WebhookNotificationTypesRenderText["upcoming_match"]
  );

  embed.setColor(embedConstants.upcomingMatchNotification);

  embed.setTitle(
    `${WebhookTypesRenderText["upcoming_match"]} - ${data.event_name}`
  );

  embed.setDescription(
    `${CompetitionLevelTextStrings[data.competition_level]}${
      data.competition_level != CompetitionLevels.QM
        ? ` ${data.set_number}`
        : ""
    } Match ${data.match_number}`
  );

  embed.addFields([
    {
      name: "Predicted Time",
      value: `${
        data.predicted_time
          ? format(convertTZ(data.predicted_time * 1000, data.timezone), "p")
          : "No time provided"
      }`,
      inline: true,
    },
    {
      name: "Scheduled Time",
      value: `${
        data.scheduled_time
          ? format(convertTZ(data.scheduled_time * 1000, data.timezone), "p")
          : "No time provided"
      }`,
      inline: true,
    },
    {
      name: "Teams",
      value: `${
        data.teams ? data.teams.join(", ").split("frc").join("") : "N/A"
      }`,
    },
    {
      name: "Blue Alliance",
      value:
        data.alliances?.blue?.team_keys.join(", ").split("frc").join("") ||
        "N/A",
      inline: true,
    },
    {
      name: "Red Alliance",
      value:
        data.alliances?.red?.team_keys.join(", ").split("frc").join("") ||
        "N/A",
      inline: true,
    },
  ]);

  return embed;
}
