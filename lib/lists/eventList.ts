import constants from "../constants";
import { APIEvent } from "../../models/APIModels/TBA/APIEventModel";
import { get, getMaxYear } from "../get";

var allEvents: APIEvent[];

export async function loadEvents() {
  let eventsArray: APIEvent[] = [];

  const maxYear = await getMaxYear();

  console.log("\x1b[1m", "Reading in all events from API", "\x1b[0m");

  for (let i = 0; i < maxYear - constants.base_event_year + 1; i++) {
    eventsArray = eventsArray.concat(await retrieveEvents(maxYear - i));
  }

  console.log(
    "\x1b[1m",
    `Ended up reading in ${eventsArray.length} events, last event was ${
      eventsArray[eventsArray.length - 1].key
    }`,
    "\x1b[0m"
  );

  allEvents = eventsArray;
}

async function retrieveEvents(year: number) {
  return get<APIEvent[]>(`events/${year}`);
}

export async function getEventsList(): Promise<APIEvent[]> {
  if (allEvents != null) {
    return allEvents;
  } else await loadEvents();

  return allEvents;
}
