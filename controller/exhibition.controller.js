const Exhibition = require("../models/exhibition.model");

exports.exhibition_show = function(req, res) {
    Exhibition.find({}, function(err, events) {
        console.log(events);
    })
    res.render("exhibition");
};