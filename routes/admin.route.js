const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/admin.controller");

// admin home
router.get("/", admin_controller.admin_panel);

router.get("/workshop/create", admin_controller.admin_create_ws); // render add workshop
router.get("/workshop/:branch", admin_controller.admin_wsbybranch) // get list of workshops by branch
router.get("/workshop/:branch/update/:id", admin_controller.admin_update_ws); // render update 

router.post("/workshop/create", admin_controller.create_workshop);
router.post("/workshop/update/:id", admin_controller.update_workshop);

module.exports = router;