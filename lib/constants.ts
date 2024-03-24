import { resolveColor } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  version:
    process.env.npm_package_version || process.env.BOT_VERSION || "1.0.0",
  bot_token: process.env.BOT_TOKEN || "",
  client_id: process.env.CLIENT_ID || "",
  guild_id: process.env.GUILD_ID || "",
  tba_base_api_url:
    process.env.TBA_BASE_API_URL || "https://www.thebluealliance.com/api/v3",
  tba_key: process.env.TBA_KEY || "",
  tba_base_url: process.env.TBA_BASE_URL || "https://www.thebluealliance.com",
  statbotics_base_api_url:
    process.env.STATBOTICS_BASE_URL || "https://api.statbotics.io/v2",
  bot_logo_url: process.env.BOT_LOGO_URL || "",
  cloudinary_bucket_url: process.env.CLOUDINARY_BUCKET_URL || "",
  discord_autocomplete_max_options: 25,
  discord_autocomplete_max_value_length: 100,
  base_event_year: 2001,
};

export const embedConstants = {
  eventColor: resolveColor([52, 186, 235]),
  errorColor: resolveColor([207, 0, 0]),
  loadingColor: resolveColor([50, 137, 68]),
  upcomingMatchNotification: resolveColor([235, 52, 195]),
};
