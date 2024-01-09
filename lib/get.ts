import constants from "../constants";

const requestHeaders = new Headers({
  "X-TBA-Auth-Key": constants.tba_key,
});

/**
 * Makes a GET request to the specified path and returns the response data.
 * @param path - The path to make the GET request to.
 * @returns A Promise that resolves to the response data.
 * @template T - The type of the response data.
 */
export async function get<T>(path: string): Promise<T> {
  const data = await apiRequest(path);
  return data as T;
}

/**
 * Makes an API request using the GET method.
 * @param path - The path of the API endpoint.
 * @returns A Promise that resolves to the response data.
 * @throws An error if the HTTP status code is not 200.
 */
async function apiRequest(path: string): Promise<any> {
  const data = await fetch(`${constants.tba_base_api_url}/${path}`, {
    method: "GET",
    headers: requestHeaders,
  });

  if (data.status != 200) {
    let resp = await data.json();
    throw new Error(
      "Received Non-200 HTTP code: " +
        data.status +
        ". JSON Body was: " +
        JSON.stringify(resp)
    );
  }

  return data.json();
}
