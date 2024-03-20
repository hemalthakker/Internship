const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://aakash:aakash@cluster0.ft18gyk.mongodb.net/";

async function dbConnect() {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = dbConnect;
