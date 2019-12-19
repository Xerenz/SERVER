const express = require("express");
const router = express.Router();

const user_controller = require("../controller/user.controller");

router.get("/", user_controller.user_register);
router.post("/", user_controller.user_post_register);

module.exports = router;