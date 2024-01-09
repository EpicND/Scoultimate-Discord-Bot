export interface TeamEmbed {
  team_name: string;
  team_number: string;
  awards: Award[];
  years: number[];
  events: Event[];
  socials: Social[];
}

export interface Award {
  name: string;
}

export interface Event {
  key: string;
  name: string;
}

export interface Social {
  service: string;
  url: string;
}
