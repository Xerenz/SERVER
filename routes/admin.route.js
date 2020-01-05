const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/admin.controller");

router.get("/", admin_controller.admin_panel);
router.get("/workshop/create", admin_controller.admin_create_ws);

router.post("/workshop/create", admin_controller.create_workshop);

module.exports = router;