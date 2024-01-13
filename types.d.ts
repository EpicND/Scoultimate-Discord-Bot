import { Client, Collection } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
  }
}

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
  modal?: (interaction: ModalSubmitInteraction<CacheType>) => void;
  cooldown?: number; // in seconds
}
