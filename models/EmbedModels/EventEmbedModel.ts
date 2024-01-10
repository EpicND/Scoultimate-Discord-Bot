export interface EventEmbed {
  event_name: string;
  event_type: string;
  key: string;
  week: number;
  start: Date;
  end: Date;
  website?: string;
  top?: {
    1: TeamRank;
    2: TeamRank;
    3: TeamRank;
  };
  country: string;
  location: string;
  address?: string;
}

export interface TeamRank {
  record: {
    w: number;
    l: number;
    t: number;
  };
  team: number | string;
}
