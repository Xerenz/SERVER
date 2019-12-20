const Exhibition = require("../models/exhibition.model");
const FreeEvent = require("../models/freeEve.model");
const PaidEvent = require("../models/paidEve.model");
const Workshop = require("../models/ws.model");

const event_array = [
    Exhibition,
    FreeEvent,
    PaidEvent,
    Workshop,
]

exports.admin_panel = function(req, res) {
    res.render("admin");
};

exports.admin_post = function(req, res) {
    console.log("post request called");
    res.send(req.body);
}

exports.get_branch_events = function(req, res) {
    var branch_events = [];
    event_array.forEach(function(event) {
        event.find({branch : req.body.param}, function(err, docs) {
            if (err) 
                return console.log(err);
            branch_events.push(docs);
        }); 
        console.log("finished searching Event");
    });
    
    res.json(branch_events);
};