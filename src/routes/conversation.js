const express = require("express");
const router = express.Router();
const ConversationModel = require("../models/ConversationModel");

router.post("/", async (req, res) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await ConversationModel.find({
      members: {
        $in: [req.params.userId],
      },
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
