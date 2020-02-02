const express = require("express");
const router = express.Router();

const spotlight_controller = require("../controller/spotlight.controller");

router.get("/", spotlight_controller.show);

router.post("/promenad/api", spotlight_controller.promenad_webhook);
router.post("/step-up-solo/api", spotlight_controller.step_up_solo_webhook);
router.post("/ragarhapsody/api", spotlight_controller.ragarhapsody_webhook);

router.get("/api", spotlight_controller.redirect);

module.exports = router;