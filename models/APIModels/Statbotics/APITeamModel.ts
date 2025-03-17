import { District } from "../TBA/APIEventModel";

export interface APITeamStatbotics {
  team: number;
  year: number;
  name: string;
  country: string;
  state: string;
  district: any;
  epa: Epa;
  record: Record;
  district_points: any;
  district_rank: any;
  competing: Competing;
}

export interface Epa {
  total_points: TotalPoints;
  unitless: number;
  norm: number;
  conf: number[];
  breakdown: Breakdown;
  stats: Stats;
  ranks: Ranks;
}

export interface TotalPoints {
  mean: number;
  sd: number;
}

export interface Breakdown {
  total_points: number;
  auto_points: number;
  teleop_points: number;
  endgame_points: number;
  auto_rp: number;
  coral_rp: number;
  barge_rp: number;
  tiebreaker_points: number;
  auto_leave_points: number;
  auto_coral: number;
  auto_coral_points: number;
  teleop_coral: number;
  teleop_coral_points: number;
  coral_l1: number;
  coral_l2: number;
  coral_l3: number;
  coral_l4: number;
  total_coral_points: number;
  processor_algae: number;
  processor_algae_points: number;
  net_algae: number;
  net_algae_points: number;
  total_algae_points: number;
  total_game_pieces: number;
  barge_points: number;
  rp_1: number;
  rp_2: number;
  rp_3: number;
}

export interface Stats {
  start: number;
  pre_champs: number;
  max: number;
}

export interface Ranks {
  total: Total;
  country: Country;
  state: State;
  district: District;
}

export interface Total {
  rank: number;
  percentile: number;
  team_count: number;
}

export interface Country {
  rank: number;
  percentile: number;
  team_count: number;
}

export interface State {
  rank: number;
  percentile: number;
  team_count: number;
}

export interface Record {
  wins: number;
  losses: number;
  ties: number;
  count: number;
  winrate: number;
}

export interface Competing {
  this_week: boolean;
  next_event_key: string;
  next_event_name: string;
  next_event_week: number;
}
