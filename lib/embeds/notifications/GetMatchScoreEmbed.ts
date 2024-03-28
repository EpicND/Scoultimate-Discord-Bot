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
import {
  MatchScoreNotificationEmbed,
  WinningAllianceColor,
  WinningAllianceRenderString,
} from "../../../models/EmbedModels/Notifications/MatchScoreEmbedModel";

export function generateMatchScoreEmbed(
  data: MatchScoreNotificationEmbed
): EmbedBuilder {
  const embed = getStandardEmbed(
    "Notification",
    WebhookNotificationTypesRenderText["match_score"]
  );

  embed.setColor(WinningAllianceColor[data.winning_alliance]);

  embed.setTitle(
    `${WebhookTypesRenderText["match_score"]} - ${data.event_name}`
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
      name: "Winning Alliance",
      value: `${WinningAllianceRenderString[data.winning_alliance]}`,
    },
    {
      name: "Score",
      value: `Blue ${data.alliances?.blue.score || "NA"} - ${
        data.alliances?.red.score || "NA"
      } Red`,
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
