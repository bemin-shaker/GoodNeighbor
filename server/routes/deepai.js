const express = require("express");
const router = express.Router();
const deepai = require("deepai");

deepai.setApiKey("717aec2d-0cc3-423e-8f8f-3d0421e6a8b4");

router.post("/detect-text", async (req, res) => {
  let textInput = req.body.text;
  const result = await deepai.callStandardApi("sentiment-analysis", {
    text: textInput,
  });

  res.json(result);
});

//   const detectImage = async (imgUrl) => {
//     const result = await deepai.callStandardApi("content-moderation", {
//       image: imgUrl,
//     });
//     console.log(result);
//   };

module.exports = router;
