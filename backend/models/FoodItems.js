const mongoose = require("mongoose");
const { Schema } = mongoose;

//name img type

const foodItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("foodItems", foodItemsSchema);
