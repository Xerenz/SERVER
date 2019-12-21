const express = require("express");
const router = express.Router();

const event_controller = require("../controller/event.controller");

router.get("/", event_controller.test);

module.exports = router;