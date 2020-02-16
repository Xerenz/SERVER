const Main = require("../models/main.model");
const Event = require("../models/event.model");
const Workshop = require("../models/ws.model");

const async = require("async");

exports.event_show = function(req, res) {
    Event.find({}, function(err, events) {
        if (err) return console.log(err);

        Workshop.find({}, function(err, workshops) {
            if (err) return console.log(err);

            let all = events.concat(workshops);

            res.render("onday/", {data : all});
        });

    });
};

exports.branch_show = function(req, res) {
    Event.find({branch : req.params.branch}, function(err, events) {
        if (err) return console.log(err);

        Workshop.find({branch : req.params.branch}, function(err, workshops) {
            if (err) return console.log(err);

            let branchAll = events.concat(workshops);

            res.render("onday/", {data : branchAll});
        });
    });
};

exports.registration_show = function(req, res) {
    Main.find({event : req.params.branch}, function(err, docs) {
        res.render("onday/", {data : docs});
    });
};