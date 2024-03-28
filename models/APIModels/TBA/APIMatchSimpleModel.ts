import { CompetitionLevels } from "../../WebhookModels/CompetitionLevel";
import { Alliances } from "./APIMatchModel";

export interface APIMatchSimple {
  key: string;
  comp_level: CompetitionLevels;
  set_number: number;
  match_number: number;
  alliances?: Alliances;
  winning_alliance?: "red" | "blue" | "";
  event_key: string;
  time?: number;
  predicted_time?: number;
  actual_time?: number;
}
