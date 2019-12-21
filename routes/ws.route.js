const express = require("express");
const router = express.Router();

const ws_controller = require("../controller/ws.controller");

router.get("/", ws_controller.test);

module.exports = router;