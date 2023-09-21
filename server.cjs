const Express = require('express')
const app = Express();
const OpenAI = require('openai')
const port = 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

var messages = [];
const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

async function main(input) {
  messages.push({role:"user", content:input})
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]?.message?.content;
}


// Define a route that responds with "Hello, World!"
app.get('/', (req, res) => {
  res.sendFile(__dirname + "\\index.html");
});

app.post('/api', async (req, res, next) => {
  console.log(req.body)
  const mes = await main(req.body.input)
  res.json({success: true, message:mes})
})
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
