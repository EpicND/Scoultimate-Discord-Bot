export interface APITeamAward {
  name: string;
  award_type: number;
  event_key: string;
  recipient_list: RecipientList[];
  year: number;
}

export interface RecipientList {
  team_key?: string;
  awardee?: string;
}
