const express = require("express");
const router = express.Router();

const exhibition_controller = require("../controller/exhibition.controller");

router.get("/", exhibition_controller.test);

module.exports = router;