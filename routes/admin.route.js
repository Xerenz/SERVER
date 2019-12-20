const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/admin.controller");

router.get("/", admin_controller.admin_panel);
router.get("/:branch", admin_controller.get_branch_events);
router.post("/", admin_controller.admin_post);

module.exports = router;