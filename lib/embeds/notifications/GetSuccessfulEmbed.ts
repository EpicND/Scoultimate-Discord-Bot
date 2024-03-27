import { EmbedBuilder } from "discord.js";
import { getStandardEmbed } from "../generate";
import { embedConstants } from "../../constants";

export function getSuccessfulSubscriptionEmbed(): EmbedBuilder {
  const embed = getStandardEmbed("/subscribe", "Subscribe");

  embed.setColor(embedConstants.successColor);

  embed.setTitle("Subscription Successful");
  embed.setDescription(
    "You will now receive notifications for this team/event."
  );

  return embed;
}

export function getSuccessfulUnsubscribeEmbed(): EmbedBuilder {
  const embed = getStandardEmbed("/unsubscribe", "Unsubscribe");

  embed.setColor(embedConstants.successColor);

  embed.setTitle("Unsubscribing Successful");
  embed.setDescription(
    "You will no longer receive notifications for this team/event."
  );

  return embed;
}
