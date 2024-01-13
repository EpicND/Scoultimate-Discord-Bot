import { Client, Collection } from "discord.js";

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
  }
}

export interface ClientWithCommands extends Client {
  commands: Collection<any, any>;
}
