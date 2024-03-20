export interface AboutEmbed {
  guilds: number;
  users: number;
  channels: number;
  uptime: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  memory: number;
  commandsUsed: number;
}
