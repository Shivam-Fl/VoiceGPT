import OpenAI from "openai";
import * as readline from "node:readline/promises";
import {stdin as input, stdout as output} from "node:process";
require("dotenv").config();
const OpenAIKEY = process.env.OPEN_AI_KEY;

const rl = readline.createInterface({input,output})
var messages = [];
const openai = new OpenAI({
  apiKey: OpenAIKEY, 
});

async function main(input) {
  messages.push({role:"user", content:input})
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]?.message?.content);
}

// main();

rl.on('line', (input)=>{
  console.log(`Recieved: ${input}`);
  main(input);
  if(input === "q"){
  rl.close();
}
});
