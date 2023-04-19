const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DATA_MONGO = process.env.DATA_MONGO;

async function connect() {
  try {
    await mongoose.connect(DATA_MONGO);
    console.log("connected");
  } catch (error) {
    console.log("Failed");
  }
}

module.exports = { connect };
