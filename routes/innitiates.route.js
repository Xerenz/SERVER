const express = require("express");
const router = express.Router();

const innitiates_controller = require("../controller/innitiates.controller");

router.get("/quiz/view", innitiates_controller.quiz_view);
router.post("/quiz/register", innitiates_controller.quiz_register);


module.exports = router;