import { APIMatch } from "../APIModels/TBA/APIMatchModel";
import { WebhookTypes } from "./GeneralWebhookModel";

export interface TBAMatchScoreNotification {
  message_type: WebhookTypes;
  message_data: MessageData;
}

export interface MessageData {
  event_key: string;
  match_key: string;
  team_key?: string;
  event_name: string;
  match: APIMatch;
}
