require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

// Slack app token.
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// Ping command.
app.command("/biology_fun_fact_bot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Hello! Pong! \nLatency: ${latency}ms` });
});

// Help command.
app.command("/biology_fun_fact_bot-help",async({ack,respond})=>{
  await ack();
  await respond({
    text:
`Available Commands:
/biology_fun_fact_bot-ping - Check bot latency
/biology_fun_fact_bot-help - Show this menu
/biology_fun_fact_bot-animalfact - Get a random animal fun fact
/biology_fun_fact_bot-animalimg - Get a random animal image`
  });
});

// Random animal image command.
app.command("/biology_fun_fact_bot-animalimg",async({ack,respond})=>{
  await ack();

  const animalsList = ["fox", "cat", "birb", "panda", "red_panda", "racoon", "kangaroo", "whale", "dog", "bird", "koala"];
  const randomSelection = animalsList[Math.floor(Math.random() * animalsList.length)];

  (async () => {
try {
  const response = await axios.get(`https://api.some-random-api.com/img/${randomSelection}`);
  const imageUrl = response.data.link;
  await respond({
    blocks: [{type:"header", text: {type:"plain_text", text: `Random ${randomSelection}`}},
    {type: "image", image_url: imageUrl, alt_text: `Random ${randomSelection}`}]
});


} catch (err) {
        await respond({text: "Failed to fetch a random animal image."});
    }
  })();
});

// Random animal fun fact command.
app.command("/biology_fun_fact_bot-animalfact",async({ack,respond})=>{
  await ack();

  const animalsList = ["panda", "fox", "bird", "koala", "kangaroo", "raccoon", "whale"];
  const randomSelection = animalsList [Math. floor(Math.random() * animalsList.length)];

(async () => {
try {
  const response = await axios.get(`https://api.some-random-api.com/animal/${randomSelection}`);
  await respond({
    text:
`*Animal Biology Fact (${randomSelection}):* \n\n> ${response.data.fact}`
});


} catch (err) {
        await respond({text: "Failed to fetch a random animal fact."});
    }
  })();
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
