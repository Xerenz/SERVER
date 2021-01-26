const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/admin.controller");

// admin home
router.get("/", admin_controller.admin_panel);

// viewing events, workshops, exhibitions
router.get("/workshop/:branch/view", admin_controller.view_workshop);
router.get("/workshop/:branch/new", admin_controller.add_workshop);

router.get("/event/:branch/view", admin_controller.view_events);
router.get("/event/:branch/new", admin_controller.add_events);

router.get("/exhibition/:branch/view", admin_controller.view_workshop);
router.get("/exhibition/:branch/new", admin_controller.add_exhibitions);

// delete a workshop, event, workshop
router.delete("/workshop/:branch/delete/:id", admin_controller.delete_workshop);
router.delete("/event/:branch/delete/:id", admin_controller.delete_event);
router.delete("/exhibition/:branch/delete/:id", admin_controller.delete_exhibition);

// create 
router.post("/workshop/:branch/new", admin_controller.create_workshop);
router.post("/exhibition/:branch/new", admin_controller.create_exhibition);
router.post("/event/:branch/new", admin_controller.create_event);

// update
router.post("/workshop/:branch/edit/:id", admin_controller.delete_workshop);
router.post("/exhibition/:branch/edit/:id", admin_controller.delete_exhibition);
router.post("/event/:branch/edit/:id", admin_controller.delete_event);

module.exports = router;