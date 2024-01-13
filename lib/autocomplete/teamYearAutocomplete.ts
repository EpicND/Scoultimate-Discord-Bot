import { get } from "../get";
import { AutocompleteOption } from "../../models/AutocompleteOptionModel";
import constants from "../../constants";

export async function getTeamYearsParticipated(team_number: number) {
  return get<number[]>(`team/frc${team_number}/years_participated`);
}

export async function TeamYearAutocomplete(
  team: number,
  input?: number
): Promise<AutocompleteOption[]> {
  const years = (await getTeamYearsParticipated(team)).reverse();

  const options = input
    ? years.filter((year) => year.toString().includes(`${input}`))
    : years;

  const final = options.map((year) => ({ name: `${year}`, value: year }));
  final.length =
    final.length > constants.discord_autocomplete_max_options
      ? constants.discord_autocomplete_max_options
      : final.length;

  return final;
}
