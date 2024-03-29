import { startBot } from "./bin/bot";
import { app, PORT } from "./bin/webhooks";
import { Colors, customLog } from "./lib/logging";

console.log("\x1b[1m\x1b[40m\x1b[37m", "Starting Scoultimate", "\x1b[0m\n");

customLog("Starting Scoultimate", Colors.BgBlack, "log", true, true);

console.log("\x1b[4m\x1b[36m\x1b[1m");
console.log(
  `${
    "Launching with " + process.env.ENVIRONMENT ||
    "NO ENVIRONMENT SPECIFIED, DEFAULTING TO PRODUCTION"
  } environment\n`
);

console.log(`Opening Webhook Listener on Port ${PORT}\n`);

console.log(
  `${
    process.env.CLEAR
      ? "Clearing all commands on Discord and republishing"
      : "Not clearing commands on Discord"
  }\n`
);
console.log("\x1b[0m");

startBot();

app.listen(PORT, () => {
  console.log(
    "\x1b[1m\x1b[32m",
    `Webhook Listener Live on Port ${PORT}`,
    "\x1b[0m"
  );
});
