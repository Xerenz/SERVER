const express = require("express");
const router = express.Router();

const user_controller = require("../controller/user.controller");


// static routes
router.get("/", user_controller.home);
router.get("/about", user_controller.about);
router.get("/contact", user_controller.contact);
router.get("/outreach", user_controller.outreach);

// user registration routes
router.get("/profile", user_controller.user_profile);

router.get("/signin", user_controller.user_signin);
router.post("/signin", user_controller.user_register);

router.get("/login", user_controller.user_login);
router.post("/login", user_controller.user_auth, user_controller.user_loginset);

module.exports = router;