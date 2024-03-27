import { EmbedBuilder } from "discord.js";
import { DatabaseGuild } from "../../../models/DatabaseModels/Notitfications/GuildModel";
import { getStandardEmbed } from "../generate";
import { embedConstants } from "../../constants";
import { getSubscriptions } from "../../notifications/getSubscriptions";

export async function getSubscriptionsEmbedFromGuildId(id: string) {
  const data = await getSubscriptions(id);

  return getSubscriptionsEmbed(data);
}

export function getSubscriptionsEmbed(data?: DatabaseGuild): EmbedBuilder {
  let eventStr = "";
  let teamStr = "";

  for (let key in data?.events) {
    eventStr += `${
      key == "all" ? "All Events" : key
    }: notifications being sent to <#${data.events[key]}>\n`;
  }

  for (let key in data?.teams) {
    teamStr += `${key}: notifications being sent to <#${data.teams[key]}>\n`;
  }

  eventStr = eventStr == "" ? "No event notifications" : eventStr;
  teamStr = teamStr == "" ? "No team notifications" : teamStr;

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
