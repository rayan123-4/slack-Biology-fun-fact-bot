require("dotenv").config();


// TEMPORARY DEBUG LOGS
console.log("BOT_TOKEN Exists?:", !!process.env.SLACK_BOT_TOKEN);
console.log("BOT_TOKEN Starts with xoxb?:", process.env.SLACK_BOT_TOKEN?.startsWith("xoxb-"));
console.log("APP_TOKEN Exists?:", !!process.env.SLACK_APP_TOKEN);
console.log("APP_TOKEN Starts with xapp?:", process.env.SLACK_APP_TOKEN?.startsWith("xapp-"));

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/bot_name-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
