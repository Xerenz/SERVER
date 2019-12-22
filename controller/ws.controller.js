const Workshop = require("../models/ws.model");


exports.ws_show = function(req, res) {
    Workshop.find({}, function(req, events) {
        console.log(events);
    });
    res.render("workshop");
};

