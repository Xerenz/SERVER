const express = require('express');
const router = express.Router();

const data_controller = require('../controller/volunteer_list.controller');

router.get("/", data_controller.data_show);

module.exports = router;