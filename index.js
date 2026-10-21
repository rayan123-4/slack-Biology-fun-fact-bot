require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/biology_fun_fact_bot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Hello! Pong! \nLatency: ${latency}ms` });
});

app.command("/biology_fun_fact_bot-help",async({ack,respond})=>{
  await ack();
  await respond({
    text:
`Available Commands:
/biology_fun_fact_bot-ping - Check bot latency
/biology_fun_fact_bot-help - Show this menu
/biology_fun_fact_bot-animalfact - Get a animal fun fact`
  });
});

app.command("/biology_fun_fact_bot-animalfact",async({ack,respond})=>{
  await ack();

const animalsList = ["panda", "fox", "bird", "koala", "kangaroo", "raccoon", "whale"];
const randomSelection = animalsList [Math. floor(Math.random() * animalsList.length)];

try {
  const response = await axios.get(`https://some-random-api.com/animal/${randomSelection}`);
  await respond({
    text:
`*Animal Biology Fact (${randomSelection}):* \n\n> ${response.data.fact}`
});

await respond({text: "Wait Please"});

} catch (err) {
        await respond({text: "Failed to fetch a biology fact."});
    }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
