const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

router.post("/create-verification-session/:id", async (req, res) => {
  const verificationSession = await stripe.identity.verificationSessions.create(
    {
      type: "document",
      metadata: {
        user_id: req.params.id,
      },
    }
  );

  const clientSecret = verificationSession;
  res.json(clientSecret);
});

module.exports = router;
