const Exhibition = require("../models/exhibition.model");


// show all

exports.exhibition_show = function(req, res) {
    Exhibition.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("exhibition", {events : events});
    });
};


// search for events by label

exports.label_show = function(req, res) {
    Exhibition.find({label : req.params.label}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};
