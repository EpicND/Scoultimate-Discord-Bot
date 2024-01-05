import * as dotenv from "dotenv";
dotenv.config();

export default {
  bot_token: process.env.BOT_TOKEN || "",
  client_id: process.env.CLIENT_ID || "",
  guild_id: process.env.GUILD_ID || "",
};
