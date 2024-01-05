import { Client, Collection } from "discord.js";

export interface ClientWithCommands extends Client {
  commands: Collection<any, any>;
}
