import { embedConstants } from "../../../lib/constants";
import { Alliances } from "../../APIModels/TBA/APIMatchModel";
import { CompetitionLevels } from "../../WebhookModels/CompetitionLevel";

export interface MatchScoreNotificationEmbed {
  event_name: string;
  alliances?: Alliances;
  teams?: string[];
  scheduled_time?: number;
  predicted_time?: number;
  match_number: number | string;
  set_number: number | string;
  competition_level: CompetitionLevels;
  winning_alliance: "blue" | "red" | "";
}

export const WinningAllianceRenderString = {
  blue: "Blue",
  red: "Red",
  "": "Draw",
};

export const WinningAllianceColor = {
  blue: embedConstants.matches.blueWinColor,
  red: embedConstants.matches.redWinColor,
  "": embedConstants.matches.drawMatchColor,
};
