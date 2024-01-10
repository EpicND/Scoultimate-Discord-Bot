export interface TeamEmbed {
  team_name: string;
  team_number: number | string;
  awards: Award[];
  years: number[];
  events: Event[];
  profiles: SocialProfile[];
  city?: string;
  country?: string;
  state_prov?: string;
  logo_url: string;
  rookie_year?: number;
}

export interface Award {
  name: string;
}

export interface Event {
  key: string;
  name: string;
}

export interface SocialProfile {
  service: string;
  url?: string;
  id: string;
}
