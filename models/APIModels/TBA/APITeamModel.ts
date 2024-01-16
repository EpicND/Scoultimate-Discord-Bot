export interface APITeam {
  key: string;
  team_number: number;
  nickname?: string;
  name: string;
  school_name?: string;
  city?: string;
  state_prov?: string;
  country?: string;
  address?: string;
  postal_code?: string;
  gmaps_place_id?: string;
  gmaps_url?: string;
  lat?: number;
  lng?: number;
  location_name?: string;
  website?: string;
  rookie_year?: number;
  motto?: string;
  home_championship?: HomeChampionship;
}

export interface HomeChampionship {
  [key: string]: string;
}
