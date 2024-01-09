import * as dotenv from "dotenv";
dotenv.config();

export default {
  version: process.env.BOT_VERSION || "1.0.0",
  bot_token: process.env.BOT_TOKEN || "",
  client_id: process.env.CLIENT_ID || "",
  guild_id: process.env.GUILD_ID || "",
  tba_base_api_url:
    process.env.TBA_BASE_API_URL || "https://www.thebluealliance.com/api/v3",
  tba_key: process.env.TBA_KEY || "",
  tba_base_url: process.env.TBA_BASE_URL || "https://www.thebluealliance.com",
  bot_logo_url: process.env.BOT_LOGO_URL || "",
};
