const router = require("express").Router();

const frontdesk_controller = require("../controller/frontdesk.controller");

router.get("/", frontdesk_controller.event_show);
router.get("/:branch/dash/", frontdesk_controller.branch_show);
router.get("/:event/view/", frontdesk_controller.registration_show);

module.exports = router;