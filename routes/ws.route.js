const express = require("express");
const router = express.Router();

const ws_controller = require("../controller/ws.controller");

router.get("/", ws_controller.ws_show);
router.get("/filter/:label", ws_controller.label_show);
router.get("/:id/knowmore", ws_controller.ws_one_show);
// experiment
router.get("/:id/knowmore/loginandpay", ws_controller.ws_loginandpay);

// payments
router.get("/payment", ws_controller.payment);
router.post("/api", ws_controller.webhook);
router.get("/api", ws_controller.redirect);

// thankyou
router.get("/thankyou", ws_controller.thankyou);
module.exports = router;