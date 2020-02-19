const router = require("express").Router();

const frontdesk_controller = require("../controller/frontdesk.controller");

router.get("/", frontdesk_controller.event_show);
router.get("/:branch/dash/", frontdesk_controller.branch_show);
router.get("/:branch/:event/view/", frontdesk_controller.registration_show);
router.get("/:branch/:event/new/", frontdesk_controller.registration_spot_detail);
router.get("/:branch/:event/workshop/", frontdesk_controller.registration_workshop_show);
router.get("/:branch/:event/workshop/update/:id/", frontdesk_controller.registration_update_detail);



router.post("/:branch/:event/new/", frontdesk_controller.registration_spot_insert);
router.post("/:branch/:event/workshop/update/:id/", frontdesk_controller.registration_update_insert);

module.exports = router;