const FreeEvent = require("../models/freeEve.model");
const PaidEvent = require("../models/paidEve.model");
const Events = require("../models/event.model");

exports.event_show = function(req, res) {
    Events.find({}, function(err, events) {
        console.log(events);
    });
    res.render("event");
};