const router = require("express").Router();

const onday_controller = require("../controller/onday.controller");

router.get("/:branch/:event/view/", onday_controller.registration_show);
router.get("/:branch/:event/new/", onday_controller.registration_spot_detail);
router.get("/:branch/:event/status/", onday_controller.registration_status);
router.get("/:branch/:event/view/update/:id/", onday_controller.registration_update_detail);
router.get("/:branch/:event/view/attended/:id/", onday_controller.registration_attended_mark);
router.get("/:branch/:event/view/winner/:rank/:id/", onday_controller.registration_winner_mark);


router.post("/:branch/:event/new/", onday_controller.registration_spot_insert);
router.post("/:branch/:event/view/update/:id/", onday_controller.registration_update_insert);


module.exports = router;