export interface GeneralWebhook {
  message_type: WebhookTypes;
}

// Defined on The Blue Alliance: https://github.com/the-blue-alliance/the-blue-alliance/blob/py3/src/backend/common/consts/notification_type.py
export enum WebhookTypes {
  UPCOMING_MATCH = "upcoming_match",
  MATCH_SCORE = "match_score",
  LEVEL_STARTING = "starting_comp_level",
  ALLIANCE_SELECTION = "alliance_selection",
  AWARDS = "awards_posted",
  MEDIA_POSTED = "media_posted",
  DISTRICT_POINTS_UPDATED = "district_points_updated",
  SCHEDULE_UPDATED = "schedule_updated",
  FINAL_RESULTS = "final_results",
  PING = "ping",
  BROADCAST = "broadcast",
  MATCH_VIDEO = "match_video",
  EVENT_MATCH_VIDEO = "event_match_video",
  UPDATE_FAVORITES = "update_favorites",
  UPDATE_SUBSCRIPTIONS = "update_subscriptions",
  VERIFICATION = "verification",
}
