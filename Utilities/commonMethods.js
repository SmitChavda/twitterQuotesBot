const { default: axios } = require("axios");
const { categories } = require("../Constants/Constants");
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

const getRandomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

const tossCoin = () => {
  const random = Math.random();
  return random < 0.5 ? "Heads" : "Tails";
};

const tweetQuote = async (quote, author) => {
  try {
    let tweetContent = `"${quote}" - ${author}`;
    tweetContent += "#motivation #thoughts #morning #thinking #celebrities #quotes";
    console.log("tweeted Content ", tweetContent);
    const { data } = await twitterClient.v2.tweet(tweetContent);
    console.log("Tweeted:", data);
  } catch (error) {
    console.error("Error tweeting:", error);
  }
};

// const uploadImage = async (imagePath, author) => {
//   try {
//     const imageData = fs.readFileSync(imagePath);
//     const mediaId = await twitterClient.v1.uploadMedia(imageData, {
//       type: "png",
//     });
//     const { data } = await twitterClient.v2.tweet(`Image by ${author}`, {
//       media: { media_ids: [mediaId] },
//     });
//     console.log("Image uploaded and tweeted:", data);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

const generateQuote = async () => {
  try {
    const category = getRandomCategory();
    const response = await axios.get(
      `${process.env.BASE_QUOTE_URL}quotes?category=${category}`,
      {
        headers: {
          "X-Api-Key": process.env.QUOTES_API_KEY,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.status, error.response.data);
    } else {
      console.error("Request failed:", error.message);
    }
  }
};

module.exports = {
  getRandomCategory,
  tossCoin,
//   uploadImage,
  tweetQuote,
  generateQuote,
};
