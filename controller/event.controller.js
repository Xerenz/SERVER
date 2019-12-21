const FreeEvent = require("../models/freeEve.model");
const PaidEvent = require("../models/paidEve.model");

exports.event_show = function(req, res) {
    res.render("event");
};