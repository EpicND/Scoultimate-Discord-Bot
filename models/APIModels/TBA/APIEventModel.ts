export interface APIEvent {
  key: string;
  name: string;
  event_code: string;
  event_type: number;
  district?: District;
  city?: string;
  state_prov?: string;
  country?: string;
  start_date: string;
  end_date: string;
  year: number;
  short_name?: string;
  event_type_string: string;
  week?: number;
  address?: string;
  postal_code?: string;
  gmaps_place_id?: string;
  gmaps_url?: string;
  lat?: number;
  lng?: number;
  location_name?: string;
  timezone?: string;
  website?: string;
  first_event_id?: string;
  first_event_code?: string;
  webcasts?: Webcast[];
  division_keys?: string[];
  parent_event_key?: string;
  playoff_type?: number;
  playoff_type_string?: string;
}

export interface District {
  abbreviation: string;
  display_name: string;
  key: string;
  year: number;
}

export interface Webcast {
  type: string;
  channel: string;
  date?: string;
  file?: string;
}
