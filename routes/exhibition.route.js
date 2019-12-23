const express = require("express");
const router = express.Router();

const exhibition_controller = require("../controller/exhibition.controller");

router.get("/", exhibition_controller.exhibition_show);
router.get("/:label", exhibition_controller.label_show);

module.exports = router;