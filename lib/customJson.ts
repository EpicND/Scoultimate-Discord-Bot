/** This is to correctly stringify the data in the same way it is stringified on TBA's server
 * (important for verifying the origin of webhook requests)
 *
 * Taken from https://stackoverflow.com/questions/24834812/space-in-between-json-stringify-output
 */
export function stringifyWithSpaces(obj: object) {
  let result = JSON.stringify(obj, null, 1); // stringify, with line-breaks and indents
  result = result.replace(/^ +/gm, " "); // remove all but the first space for each line
  result = result.replace(/\n/g, ""); // remove line-breaks
  result = result.replace(/{ /g, "{").replace(/ }/g, "}"); // remove spaces between object-braces and first/last props
  result = result.replace(/\[ /g, "[").replace(/ \]/g, "]"); // remove spaces between array-brackets and first/last items
  result = result.replace(/\\\\\\\\/g, "\\\\");
  return result;
}
