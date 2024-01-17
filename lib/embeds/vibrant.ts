import { EmbedBuilder } from "discord.js";
import vibrant from "node-vibrant";

export async function setEmbedColor(
  embed: EmbedBuilder,
  logo_url: string | undefined,
  team_number: number | string
) {
  try {
    if (logo_url) {
      const rgb = (await vibrant.from(logo_url).getPalette()).Vibrant?.rgb;

      if (rgb) {
        embed.setColor([
          // all of this converting is an edge case where vibrant provides an extremely large
          // value, and it doesn't convert to a regular integer (reproduce by getting rid of the
          // parseInt and trying the command for team 1729)
          parseInt(`${rgb[0]}`),
          parseInt(`${rgb[1]}`),
          parseInt(`${rgb[2]}`),
        ]);
      }
    }
  } catch (e) {
    // vibrant failed -- no need to do anything w this error -- not fatal
    console.log(`Team: ${team_number}, error: ${e}`);
  }
}
