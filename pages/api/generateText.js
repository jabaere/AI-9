// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//open ai
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
//open ai
export default async function handler(req, res) {
 
  const userText = req.body.input || ''
  
  if (req.method === 'POST') {
    console.log(JSON.stringify(req.body.input))
    console.log(req.body.input)
    // Process a POST request
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${userText}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: [";"],
    });
   // console.log(response.data)
    return res.status(200).json(response.data)
  } else {
    
  }
 }
