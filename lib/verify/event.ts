import { APIError } from "../../models/APIModels/TBA/APIErrorModel";
import { APIEvent } from "../../models/APIModels/TBA/APIEventModel";
import { get } from "../get";

export async function verifyEvent(key: string): Promise<boolean> {
  try {
    await get<APIEvent & APIError>(`event/${key}`);
    return true;
  } catch (e) {
    return false;
  }
}
