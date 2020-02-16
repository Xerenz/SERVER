const router = require("express").Router();

const onday_controller = require("../controller/onday.controller");

router.get("/:branch/:event/view/", onday_controller.registration_show);

module.exports = router;