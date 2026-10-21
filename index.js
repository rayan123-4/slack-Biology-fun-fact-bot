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
/biology_fun_fact_bot-animalimg - Get a random animal image
/biology_fun_fact_bot-anatomyfact - Get a random anatomy fun fact`
  });
});

// Random anatomy fun fact command
app.command("/biology_fun_fact_bot-anatomyfact",async({ack,respond})=>{
  await ack();

  const anatomyFacts = [
  "The human body consists of around 100 trillion cells.",
  "The average human produces 25,000 quarts of saliva or spit in a lifetime. That's enough saliva to fill 2 swimming pools.",
  "Stomach acid is strong enough to dissolve stainless steel.",
  "Every second, 2–3 million red blood cells are produced in the bone marrow and released into the circulation.",
  "People are taller in the morning than in the evening due to the compression on the spine throughout the day.",
  "The human heart can create enough pressure to squirt blood up to 30 feet.",
  "The only part of the body that has no blood supply is the cornea of the eye, which gets its oxygen directly from the air.",
  "The human body has more than 600 muscles.",
  "The surface area of your lungs is roughly the size of a tennis court.",
  "The human body contains enough iron to make a nail that is 3 inches long.",
  "The smallest bone in the human body is the stapes (stirrup) bone in the ear. The other two ear bones are the malleus (hammer) and incus (anvil).",
  "Hair is the fastest growing tissue in the body and can grow up to 6 inches in a year.",
  "Human eyes can distinguish up to 10 million different colors.",
  "The human body has over 100,000 miles of blood vessels.",
  "The body produces enough heat in 30 minutes to boil a half-gallon of water.",
  "Every organ we have two of, we only need one of to survive.",
  "If we hurt our pinky finger, the strength in our hand decreases by 50%.",
  "Tongue prints are as unique as fingerprints.",
  "Some people can hear the sound of their own eyeballs moving.",
  "The human body's fastest muscle is the orbicularis oculi — a ring muscle that is located around each eye socket.",
  "You can't breathe and swallow at the same time — I bet you tried!"
];

  const randomSelection3 = anatomyFacts[Math.floor(Math.random() * anatomyFacts.length)];
  await respond({
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: `Random ${randomSelection3}` }
      }
    ]
  });
});

// Random animal image command.
app.command("/biology_fun_fact_bot-animalimg",async({ack,respond})=>{
  await ack();

  const animalsList = ["fox", "cat", "birb", "panda", "red_panda", "racoon", "kangaroo", "whale", "dog", "bird", "koala"];
  const randomSelection2 = animalsList[Math.floor(Math.random() * animalsList.length)];

  (async () => {
try {
  const response = await axios.get(`https://api.some-random-api.com/img/${randomSelection2}`);
  const imageUrl = response.data.link;
  await respond({
    blocks: [{type:"header", text: {type:"plain_text", text: `Random ${randomSelection2}`}},
    {type: "image", image_url: imageUrl, alt_text: `Random ${randomSelection2}`}]
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
  const randomSelection1 = animalsList [Math. floor(Math.random() * animalsList.length)];

(async () => {
try {
  const response = await axios.get(`https://api.some-random-api.com/animal/${randomSelection1}`);
  await respond({
    text:
`*Animal Biology Fact (${randomSelection1}):* \n\n> ${response.data.fact}`
});


} catch (err) {
        await respond({text: "Failed to fetch a random animal fact."});
    }
  })();
});

app.start().catch((error) => {
  console.error("Unable to start Slack app:", error);
  process.exitCode = 1;
});
