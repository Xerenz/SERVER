const express = require("express");
const router = express.Router();

const exhibition_controller = require("../controller/exhibition.controller");

router.get("/", exhibition_controller.exhibition_show);

module.exports = router;