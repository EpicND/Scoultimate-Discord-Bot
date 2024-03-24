import constants from "../constants";
import { AutocompleteOption } from "../../models/AutocompleteOptionModel";
import { getTeamsList } from "../lists/teamList";

export async function TeamAutocomplete(
  input: string | number
): Promise<AutocompleteOption[]> {
  let inputStr = typeof input == "string" ? input.toLowerCase() : `${input}`;

  const options = (await getTeamsList()).filter(
    (team) =>
      team.name.toLowerCase().includes(inputStr) ||
      team.nickname?.toLowerCase().includes(inputStr) ||
      team.team_number.toString().includes(inputStr) ||
      team.country?.toLowerCase().includes(inputStr) ||
      team.state_prov?.toLowerCase().includes(inputStr) ||
      team.city?.toLowerCase().includes(inputStr)
  );

  const final = options.map((team) => {
    const name = `${team.team_number} ${
      team.nickname ? `- ${team.nickname}` : ""
    } ${team.city && team.country ? `- ${team.city}, ${team.country}` : ""}`;
    return {
      name:
        name.length <= constants.discord_autocomplete_max_value_length
          ? name
          : name.substring(
              0,
              constants.discord_autocomplete_max_value_length - 1
            ),
      value: team.team_number,
    };
  });

  final.length =
    final.length > constants.discord_autocomplete_max_options
      ? constants.discord_autocomplete_max_options
      : final.length;

  return final;
}
