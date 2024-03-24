import { CompetitionLevels } from "../../WebhookModels/CompetitionLevel";

export interface APIMatchSimple {
  key: string;
  comp_level: CompetitionLevels;
  set_number: number;
  match_number: number;
  alliances?: Alliances;
  winning_alliance?: string;
  event_key: string;
  time?: number;
  predicted_time?: number;
  actual_time?: number;
}

export interface Alliances {
  red?: Blue;
  blue?: Blue;
}

export interface Blue {
  score: number;
  team_keys: string[];
  surrogate_team_keys?: string[];
  dq_team_keys?: string[];
}
