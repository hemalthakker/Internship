const mongoose = require("mongoose");
const { Schema } = mongoose;

//email order_data
const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
