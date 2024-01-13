import { APITeam } from "../../models/APIModels/APITeamModel";
import { get } from "../get";

var allTeams: APITeam[];

export async function loadTeams() {
  let teamsArray: APITeam[] = [];
  let index = 0;
  let prevLength = 0;

  console.log("Reading in all teams from API");
  do {
    prevLength = teamsArray.length;
    teamsArray = teamsArray.concat(await retrievePage(index));
    index++;
  } while (teamsArray.length % 500 != 0 && teamsArray.length != prevLength);

  console.log(
    `Ended up reading in ${teamsArray.length} teams, last team was ${
      teamsArray[teamsArray.length - 1].team_number
    }`
  );

  allTeams = teamsArray;
}

async function retrievePage(page: number) {
  return get<APITeam[]>(`teams/${page}`);
}

export async function getTeamsList(): Promise<APITeam[]> {
  if (allTeams != null) {
    return allTeams;
  } else await loadTeams();

  return allTeams;
}
