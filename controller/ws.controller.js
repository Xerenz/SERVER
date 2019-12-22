const Workshop = require("../models/ws.model");


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

