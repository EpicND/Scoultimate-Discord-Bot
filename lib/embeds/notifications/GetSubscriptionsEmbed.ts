import { EmbedBuilder } from "discord.js";
import { DatabaseGuild } from "../../../models/DatabaseModels/Notitfications/GuildModel";
import { getStandardEmbed } from "../generate";
import { embedConstants } from "../../constants";

export function getSubscriptionsEmbed(data?: DatabaseGuild): EmbedBuilder {
  let eventStr = "";
  let teamStr = "";

  for (let key in data?.events) {
    eventStr += `${
      key == "all" ? "All Events" : key
    }: Notifications being sent to <#${data.events[key]}>\n`;
  }

  for (let key in data?.teams) {
    teamStr += `${key}: Notifications being sent to <#${data.teams[key]}>\n`;
  }

  eventStr = eventStr == "" ? "No event notifications" : eventStr;
  teamStr = teamStr == "" ? "No team notifications" : eventStr;

  const embed = getStandardEmbed("/notifications", "Notifications");
  embed.addFields([
    {
      name: "Events",
      value: eventStr,
    },
    {
      name: "Teams",
      value: teamStr,
    },
  ]);

  embed.setColor(embedConstants.eventColor);

  return embed;
}
