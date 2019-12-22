const Exhibition = require("../models/exhibition.model");

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