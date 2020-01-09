const express = require("express");
const router = express.Router();

const innitiates_controller = require("../controller/innitiates.controller");

router.get("/quiz", innitiates_controller.quiz_re);
router.get("/quiz/view", innitiates_controller.quiz_view);
router.post("/quiz/register", innitiates_controller.quiz_register);
router.get("/exhibition", innitiates_controller.exhibition_re);
router.get("/exhibition/view", innitiates_controller.exhibition_view);
router.post("/exhibition/register", innitiates_controller.exhibition_register);


module.exports = router;