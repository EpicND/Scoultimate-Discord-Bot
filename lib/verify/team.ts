import { APIError } from "../../models/APIModels/TBA/APIErrorModel";
import { APITeam } from "../../models/APIModels/TBA/APITeamModel";
import { get } from "../get";

export async function verifyTeam(
  teamNumber: string | number
): Promise<boolean> {
  try {
    await get<APITeam & APIError>(`team/frc${teamNumber}`);
    return true;
  } catch (e) {
    return false;
  }
}
