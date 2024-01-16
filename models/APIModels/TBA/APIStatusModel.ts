export interface APIStatus {
  current_season: number;
  max_season: number;
  is_datafeed_down: boolean;
  down_events: string[];
  ios: AppVersion;
  android: AppVersion;
}

export interface AppVersion {
  min_app_version: number;
  latest_app_version: number;
}
