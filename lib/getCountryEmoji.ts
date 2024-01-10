/**
 * Returns the emoji corresponding to the given country.
 * Only supports the countries where FIRST Events currently occur.
 *
 * If for some reason it's an unexpected country, returns the FIRST logo.
 * @param country - The country for which to get the emoji.
 * @returns The emoji representing the country.
 */
export function getCountryEmoji(country: string) {
  switch (country) {
    case "USA":
      return "🇺🇸";
    case "Israel":
      return "🇮🇱";
    case "China":
      return "🇨🇳";
    case "Australia":
      return "🇦🇺";
    default:
      return "<:firstlogo:1193494520613060628>";
  }
}
