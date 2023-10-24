require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Openai = require("openai");

//middleware
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
});

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async (req, res) => {
  try {
    const response = await openai.images.generate({
      prompt: "a flying astronaut",
      n: 1,
      size: "256x256",
    });

    const image_url = response.data.data[0].url;
    res.json({ data: image_url });
  } catch (error) {
    // res.status(500).json({ error: "An error occurred" });
    console.error("Error creating image:", error.message);
  }
};

main();

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});
