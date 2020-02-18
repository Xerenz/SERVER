const router = require("express").Router();

const manager_controller = require("../controller/manager.controller");

router.get("/:event/view", manager_controller.data_show);
router.get("/dash/:branch", manager_controller.branch_show);

module.exports = router;