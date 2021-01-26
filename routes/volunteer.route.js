const volunteer_controller = require("../controller/volunteer.controller");
const express = require("express");
const router = express.Router();

// test event
router.get("/", volunteer_controller.test);

router.get("/event/:branch/view", volunteer_controller.view_event);
router.get("/event/:branch/new", volunteer_controller.add_event);


router.get("/event/:branch/edit/:id", volunteer_controller.edit_event);
router.get("/event/:branch/delete/:id", volunteer_controller.delete_event);

// making changes in edit
router.post("/event/:branch/edit/:id", volunteer_controller.post_edit);

// adding new event
router.post("/event/:branch/new", volunteer_controller.post_add);

module.exports = router;