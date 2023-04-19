const express = require("express");
const router = express.Router();
const MessageModel = require("../models/MessageModel");

router.post("/", async (req, res) => {
  const messages = new MessageModel(req.body);

  try {
    const savedMessage = await messages.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
