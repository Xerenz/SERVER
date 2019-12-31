const volunteer_controller = require("../controller/volunteer.controller");
const express = require("express");
const router = express.Router();

// test event
router.get("/", volunteer_controller.test);

router.get("/:branch/get", volunteer_controller.view_event);
router.get("/:branch/edit/:id/now", volunteer_controller.edit_event);
router.get("/:branch/add/new", volunteer_controller.add_event);

// making changes in edit
router.post("/:branch/edit/:id", volunteer_controller.post_edit);

// adding new event
router.post("/:branch/add/new", volunteer_controller.post_add);

module.exports = router;