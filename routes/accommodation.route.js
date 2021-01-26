const express = require("express");
const router = express.Router();

const accommodation_controller = require("../controller/hospitality.controller");

router.get("/", accommodation_controller.show);

router.post("/api", accommodation_controller.webhook);


module.exports = router;