const express = require("express");
const router = express.Router();
const user = require("../models/User");
const foodItems = require("../models/FoodItems");
const { query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "hemalthakkar";

router.post(
  "/createuser",
  [query("email").isEmail(), query("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await user.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      res.json({ sucess: true });
    } catch (error) {
      console.log(error);
      res.json({ sucess: false });
    }
  }
);

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Invalid Credentials" });
    }

    const pwdCompare = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!pwdCompare) {
      return res.status(400).json({ errors: "Invalid Credentials" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, jwtSecret);

    res.json({ sucess: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
});

router.post("/additems", async (req, res) => {
  try {
    await foodItems.create({
      name: req.body.name,
      img: req.body.img,
      type: req.body.type,
      options: req.body.options,
    });
    res.json({ sucess: true });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
});

router.post("/address", async (req, res) => {
  try {
    await user.findOneAndUpdate(
      { email: req.body.email },
      { address: req.body.address }
    );
    res.json({ sucess: true });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
});

router.post("/getAddress", async (req, res) => {
  try {
    let myData = await user.findOne({ email: req.body.email });
    let { address } = myData;
    // console.log("address", address);
    if (address === "") {
      res.status(403).json({ sucess: false });
    } else {
      res.status(200).json({ sucess: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
});

module.exports = router;
