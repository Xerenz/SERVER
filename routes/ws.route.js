const express = require("express");
const router = express.Router();

const ws_controller = require("../controller/ws.controller");

router.get("/", ws_controller.ws_show);
router.get("/:label", ws_controller.label_show);

module.exports = router;