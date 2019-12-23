const FreeEvent = require("../models/freeEve.model");
const PaidEvent = require("../models/paidEve.model");
const Events = require("../models/event.model");


// show all

exports.event_show = function(req, res) {
    Events.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("event", {events : events});
    });
};


// search for events by label

exports.label_show = function(req, res) {
    Events.find({label : req.params.label}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};
