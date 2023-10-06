require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "a flying astronaut",
      n: 1,
      size: "256x256",
    });

    const imageUrl = response.data.data[0].url;
    res.json({ data: imageUrl });
  } catch (error) {
    console.error("Error creating image:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});
