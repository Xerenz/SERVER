const express = require("express");
const router = express.Router();

const event_controller = require("../controller/event.controller");

router.get("/", event_controller.event_show);
router.get("/:label", event_controller.label_show);

module.exports = router;