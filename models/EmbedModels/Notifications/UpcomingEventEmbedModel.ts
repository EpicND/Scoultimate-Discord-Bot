import { Alliances } from "../../APIModels/TBA/APIMatchModel";
import { CompetitionLevels } from "../../WebhookModels/CompetitionLevel";

export interface UpcomingMatchNotificationEmbed {
  event_name: string;
  alliances?: Alliances;
  teams?: string[];
  scheduled_time?: number;
  predicted_time?: number;
  match_number: number | string;
  set_number: number | string;
  competition_level: CompetitionLevels;
  timezone: string;
}
