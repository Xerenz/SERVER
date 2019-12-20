const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/admin.controller");

// Manage views of admin page
router.get("/", admin_controller.admin_panel);
router.get("/free", admin_controller.admin_free);
router.get("/paid", admin_controller.admin_paid);
router.get("/exhibition", admin_controller.admin_exhibition);
router.get("/ws", admin_controller.admin_ws);

// Manage post requests
router.post("/free", admin_controller.admin_post_free);
router.post("/paid", admin_controller.admin_post_paid);
router.post("/exhibition", admin_controller.admin_post_exhibition);
router.post("/ws", admin_controller.admin_post_ws);

module.exports = router;