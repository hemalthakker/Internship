const router = require("express").Router();
const userController = require("./controller/userController");
const itemController = require("./controller/itemController");

router.post("/api/createuser", userController.createUser);

router.post("/api/loginuser", userController.verifyUser);

router.post("/api/additems", itemController.addItem);

module.exports = router;
