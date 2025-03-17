import constants from "./constants";
import { APIStatus } from "../models/APIModels/TBA/APIStatusModel";

const tbaRequestHeaders = new Headers({
  "X-TBA-Auth-Key": constants.tba_key,
});

let maxYear: number;

/**
 * Makes a GET request to the specified path and returns the response data.
 * @param path - The path to make the GET request to.
 * @returns A Promise that resolves to the response data.
 * @template T - The type of the response data.
 */
export async function get<T>(
  path: string,
  type: "TBA" | "Statbotics" = "TBA"
): Promise<T> {
  const data = apiRequest(path, type);
  return data as T;
}

export async function getMaxYear() {
  if (maxYear) return maxYear;

  const { max_season } = await get<APIStatus>("status");
  maxYear = max_season;

  return maxYear;
}

/**
 * Makes an API request using the GET method.
 * @param path - The path of the API endpoint.
 * @returns A Promise that resolves to the response data.
 * @throws An error if the HTTP status code is not 200.
 */
async function apiRequest(
  path: string,
  type: "TBA" | "Statbotics"
): Promise<any> {
  const data = await fetch(
    `${
      type === "TBA"
        ? constants.tba_base_api_url
        : constants.statbotics_base_api_url
    }/${path}`,
    {
      method: "GET",
      headers: type === "TBA" ? tbaRequestHeaders : undefined,
    }
  );

  if (data.status != 200) {
    let resp = await data.json();
    return Promise.reject(
      "Received Non-200 HTTP code for URL + " +
        `${
          type === "TBA"
            ? constants.tba_base_api_url
            : constants.statbotics_base_api_url
        }/${path}` +
        " : " +
        data.status +
        ". JSON Body was: " +
        JSON.stringify(resp)
    );
  }

  return data.json();
}
