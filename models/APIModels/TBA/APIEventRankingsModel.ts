export interface APIEventRankings {
  rankings: Ranking[];
  extra_stats_info?: Info[];
  sort_order_info: Info[];
}

export interface Info {
  precision: number;
  name: string;
}

export interface Ranking {
  matches_played: number;
  qual_average?: number;
  extra_stats?: number[];
  sort_orders?: number[];
  record: Record;
  rank: number;
  dq: number;
  team_key: string;
}

export interface Record {
  losses: number;
  wins: number;
  ties: number;
}
