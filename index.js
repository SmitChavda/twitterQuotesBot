require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const {
  generateQuote,
  tweetQuote,
} = require("./Utilities/commonMethods");
const app = express();
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const executeTwitterBot = async () => {
  try {
    let quoteResponse = await generateQuote();
    await tweetQuote(quoteResponse[0]?.quote, quoteResponse[0]?.author);
  } catch (error) {
    console.log("Something went wrong. Try again!");
    console.log(error);
  }
};

executeTwitterBot();
