require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const {
  tossCoin,
  generateQuote,
  tweetQuote,
} = require("./Utilities/commonMethods");
const { CronJob } = require("cron");
// const Jimp = require("jimp");
const app = express();
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const addOverlayToImage = async (imageUrl, outputPath) => {
//   try {
//     // Load the image from the URL
//     const image = await Jimp.read(imageUrl);

//     // Create a black image with the same dimensions as the original image
//     const blackImage = new Jimp(
//       image.bitmap.width,
//       image.bitmap.height,
//       "#000000"
//     );

//     // Set the opacity of the black image to 50% (0.5)
//     blackImage.opacity(0.5);

//     // Composite the black image over the original image
//     image.composite(blackImage, 0, 0);

//     // Save the result
//     await image.writeAsync(outputPath);
//     console.log("Overlay added successfully!");
//   } catch (err) {
//     console.error(err);
//   }
// };

const executeTwitterBot = async () => {
  try {
    const toss = tossCoin();
    console.log(toss);
    // if (toss === "Heads") {
    //   let quoteResponse = await generateQuote();
    //   await tweetQuote(quoteResponse[0]?.quote, quoteResponse[0]?.author);
    // }
    let quoteResponse = await generateQuote();
    await tweetQuote(quoteResponse[0]?.quote, quoteResponse[0]?.author);
  } catch (error) {
    console.log("Something went wrong. Try again!");
    console.log(error);
  }
};

const cronTweet = new CronJob("30 * * * * *", async () => {
  executeTwitterBot();
});

cronTweet.start();
