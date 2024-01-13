import constants from "../../constants";
import { getEventsList } from "../lists/eventList";

export async function EventAutocomplete(input: string) {
  input = input.toLowerCase();

  const options = (await getEventsList()).filter(
    (event) =>
      event.name.toLowerCase().includes(input) ||
      event.year.toString().toLowerCase().includes(input) ||
      event.key.toString().includes(input) ||
      event.country?.toLowerCase().includes(input) ||
      event.state_prov?.toLowerCase().includes(input) ||
      event.city?.toLowerCase().includes(input)
  );

  const final = options.map((event) => {
    const name = `${event.key} ${
      event.name ? `- ${event.year} ${event.name}` : ""
    } ${
      event.city && event.country ? `- ${event.city}, ${event.country}` : ""
    }`;
    return {
      name:
        name.length <= constants.discord_autocomplete_max_value_length
          ? name
          : name.substring(
              0,
              constants.discord_autocomplete_max_value_length - 1
            ),
      value: event.key,
    };
  });

  final.length =
    final.length > constants.discord_autocomplete_max_options
      ? constants.discord_autocomplete_max_options
      : final.length;

  return final;
}
