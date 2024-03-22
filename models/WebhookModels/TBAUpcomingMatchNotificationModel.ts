export interface TBAUpcomingMatchNotification {
  message_data: MessageData;
  message_type: string;
}

export interface MessageData {
  event_key: string;
  match_key: string;
  event_name: string;
  team_keys: string[];
  scheduled_time?: number;
  predicted_time?: number;
  webcast?: Webcast;
}

export interface Webcast {
  type: string;
  channel: string;
}
