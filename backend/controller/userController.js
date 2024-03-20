const user = require("../models/User");
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "hemalthakkar";

class UserController {
  async createUser(req, res) {
    // const errors = validationResult(req);
    // if (errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await user.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ sucess: true });
    } catch (error) {
      console.log(error);
      res.json({ sucess: false });
    }
  }

  async verifyUser(req, res) {
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
  }
}

module.exports = new UserController();
