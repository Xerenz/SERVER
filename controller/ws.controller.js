const Workshop = require("../models/ws.model");


// show all events

exports.ws_show = function(req, res) {
    Workshop.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};


// search for events by label

exports.label_show = function(req, res) {
    Workshop.find({label : req.params.label}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};

