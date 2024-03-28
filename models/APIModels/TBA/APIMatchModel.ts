export interface APIMatch {
  key: string;
  comp_level: string;
  set_number: number;
  match_number: number;
  alliances?: Alliances;
  winning_alliance: "red" | "blue" | "";
  event_key: string;
  time?: number;
  actual_time?: number;
  predicted_time?: number;
  post_result_time?: number;
  score_breakdown?: ScoreBreakdown;
  videos?: Video[];
}

export interface Alliances {
  red: MatchAlliance;
  blue: MatchAlliance;
}

export interface MatchAlliance {
  score: number;
  team_keys: string[];
  surrogate_team_keys?: string[];
  dq_team_keys?: string[];
}

export interface ScoreBreakdown {}

export interface Video {
  type: string;
  key: string;
}
