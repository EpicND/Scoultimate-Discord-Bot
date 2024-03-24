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

export const WebhookNotificationTypesRenderText = {
  [WebhookTypes.UPCOMING_MATCH]: "Upcoming Match Notification",
  [WebhookTypes.MATCH_SCORE]: "Match Score Notification",
  [WebhookTypes.LEVEL_STARTING]: "Level Starting Notification",
  [WebhookTypes.ALLIANCE_SELECTION]: "Alliance Selection Notification",
  [WebhookTypes.AWARDS]: "Awards Posted Notification",
  [WebhookTypes.MEDIA_POSTED]: "Media Posted Notification",
  [WebhookTypes.DISTRICT_POINTS_UPDATED]: "District Points Notification",
  [WebhookTypes.SCHEDULE_UPDATED]: "Event Schedule Notification",
  [WebhookTypes.FINAL_RESULTS]: "Final Results Notification",
  [WebhookTypes.PING]: "TBA Ping Notification",
  [WebhookTypes.BROADCAST]: "Broadcast Notification",
  [WebhookTypes.MATCH_VIDEO]: "Match Video Notification",
  [WebhookTypes.EVENT_MATCH_VIDEO]: "Event Match Video Posted Notification",
  [WebhookTypes.UPDATE_FAVORITES]: "Updated Favorites Notification",
  [WebhookTypes.UPDATE_SUBSCRIPTIONS]: "Updated Subscriptions Notification",
  [WebhookTypes.VERIFICATION]: "Verification Code Notification",
};

export const WebhookTypesRenderText = {
  [WebhookTypes.UPCOMING_MATCH]: "Upcoming Match",
  [WebhookTypes.MATCH_SCORE]: "Match Score",
  [WebhookTypes.LEVEL_STARTING]: "Level Starting",
  [WebhookTypes.ALLIANCE_SELECTION]: "Alliance Selection",
  [WebhookTypes.AWARDS]: "Awards Posted",
  [WebhookTypes.MEDIA_POSTED]: "Media Posted",
  [WebhookTypes.DISTRICT_POINTS_UPDATED]: "District Points",
  [WebhookTypes.SCHEDULE_UPDATED]: "Event Schedule",
  [WebhookTypes.FINAL_RESULTS]: "Final Results",
  [WebhookTypes.PING]: "TBA Ping",
  [WebhookTypes.BROADCAST]: "Broadcast",
  [WebhookTypes.MATCH_VIDEO]: "Match Video",
  [WebhookTypes.EVENT_MATCH_VIDEO]: "Event Match Video Posted",
  [WebhookTypes.UPDATE_FAVORITES]: "Updated Favorites",
  [WebhookTypes.UPDATE_SUBSCRIPTIONS]: "Updated Subscriptions",
  [WebhookTypes.VERIFICATION]: "Verification Code",
};
