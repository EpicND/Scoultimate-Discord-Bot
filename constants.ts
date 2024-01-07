import * as dotenv from "dotenv";
dotenv.config();

export default {
  bot_token: process.env.BOT_TOKEN || "",
  client_id: process.env.CLIENT_ID || "",
  guild_id: process.env.GUILD_ID || "",
  base_api_url:
    process.env.TBA_BASE_URL || "https://www.thebluealliance.com/api/v3",
  tba_key: process.env.TBA_KEY || "",
};
