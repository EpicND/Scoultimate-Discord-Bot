import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import constants from "./constants";
import fs from "node:fs";
import path from "node:path";

export default function deploy() {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  // Grab all the command folders from the commands directory you created earlier
  const foldersPath = path.join(__dirname, "../commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath).default;
      if (command && "data" in command && "execute" in command) {
        const data = command.data as SlashCommandBuilder;
        commands.push(data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(constants.bot_token);

  if (process.env.CLEAR == "1") {
    // for guild-based commands
    rest
      .put(
        Routes.applicationGuildCommands(
          constants.client_id,
          constants.guild_id
        ),
        { body: [] }
      )
      .then(() => console.log("Successfully deleted all guild commands."))
      .catch(console.error);

    // for global commands
    rest
      .put(Routes.applicationCommands(constants.client_id), { body: [] })
      .then(() => console.log("Successfully deleted all application commands."))
      .catch(console.error);
  }

  // and deploy your commands!
  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set

      if (process.env.ENVIRONMENT == "PRODUCTION") {
        await rest.put(Routes.applicationCommands(constants.client_id), {
          body: commands,
        });
        console.log(`Successfully reloaded application (ALL) (/) commands.`);
      } else {
        await rest.put(
          Routes.applicationGuildCommands(
            constants.client_id,
            constants.guild_id
          ),
          { body: commands }
        );

        console.log(`Successfully reloaded application (GUILD) (/) commands.`);
      }
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}
