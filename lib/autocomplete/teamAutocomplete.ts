import constants from "../../constants";
import { getTeamsList } from "../lists/teamList";

export async function TeamAutocomplete(input: string) {
  input = input.toLowerCase();

  const options = (await getTeamsList()).filter(
    (team) =>
      team.name.toLowerCase().includes(input) ||
      team.nickname?.toLowerCase().includes(input) ||
      team.team_number.toString().includes(input) ||
      team.country?.toLowerCase().includes(input) ||
      team.state_prov?.toLowerCase().includes(input) ||
      team.city?.toLowerCase().includes(input)
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
