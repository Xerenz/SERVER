const express = require("express");
const router = express.Router();

const event_controller = require("../controller/event.controller");


router.get("/", event_controller.event_show);
router.get("/filter/:label", event_controller.label_show);

// router.get("/:id/knowmore", event_controller.event_one_show);
// experiment
router.get("/:id/knowmore/loginandpay", event_controller.event_loginandpay);

// payments
// router.get("/payment", event_controller.payment);
router.post("/api", event_controller.webhook);
router.get("/api", event_controller.redirect);

// thankyou
// router.get("/thankyou", event_controller.thankyou);
module.exports = router;