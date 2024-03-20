const express = require("express");
const router = express.Router();
const user = require("../models/User");
const foodItems = require("../models/FoodItems");
const order = require("../models/Orders");

router.post("/foodData", async (req, res) => {
  try {
    let food_items = await foodItems.find({});
    res.send([food_items]);
  } catch (error) {
    console.log(error);
  }
});

router.post("/userData", async (req, res) => {
  try {
    let userData = await user.find({});
    res.send([userData]);
  } catch (error) {
    console.log(error);
  }
});

/*
router.post("/deleteuser", async (req, res) => {
  try {
    let result = await user.deleteOne({ email: req.body.email });
    let result1 = await order.deleteOne({ email: req.body.email });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
*/

router.post("/deleteuser", async (req, res) => {
  try {
    let result = await user.deleteOne({ email: req.body.email });
    let result1 = await order.deleteOne({ email: req.body.email });
    res.send(result && result1);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteitem", async (req, res) => {
  try {
    let result = await foodItems.deleteOne({ name: req.body.name });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
