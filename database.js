const mongoose = require("mongoose");

// Mongo Url goes here
const mongoURL = process.env.MONGO_URL;

async function connectToDb() {
  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectToDb;
