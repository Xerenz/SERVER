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

// Controller for all view requests

exports.admin_panel = function(req, res) {
    res.render("admin/admin");
};

exports.admin_free = function(req, res) {
    res.render("admin/free");
};

exports.admin_paid = function(req, res) {
    res.render("admin/paid");
};

exports.admin_exhibition = function(req, res) {
    res.render("admin/exhibition");
};

exports.admin_ws = function(req, res) {
    res.render("admin/ws");
};

// =============================================== //

// Controller for post routes

exports.admin_post_free = function(req, res) {
    let event_name = req.body.name;
    let event = new FreeEvent({
        name: req.body.name,
        branch: req.body.branch,
        date: req.body.date,
        content: req.body.content
    });

    event.save(function(err) {
        if (err) 
            return console.log(err);
        console.log("Event added " + event_name);
        res.redirect("free");
    });
};

exports.admin_post_paid = function(req, res) {
    let event_name = req.body.name;
    let event = new PaidEvent({
        name: req.body.name,
        branch: req.body.branch,
        price: req.body.price,
        date: req.body.date,
        content: req.body.content
    });

    event.save(function(err) {
        if (err) 
            return console.log(err);
        console.log("Event added " + event_name);
        res.redirect("paid");
    });
};

exports.admin_post_exhibition = function(req, res) {
    let event_name = req.body.name;
    let event = new Exhibition({
        name: req.body.name,
        branch: req.body.branch,
        price: req.body.price,
        date: req.body.date,
        content: req.body.content
    });

    event.save(function(err) {
        if (err) 
            return console.log(err);
        console.log("Exhibition added " + event_name);
        res.redirect("exhibition");
    });
};

exports.admin_post_ws = function(req, res) {
    let event_name = req.body.name;
    let event = new Workshop({
        name: req.body.name,
        branch: req.body.branch,
        price: req.body.price,
        date: req.body.date,
        content: req.body.content
    });

    event.save(function(err) {
        if (err) 
            return console.log(err);
        console.log("Workshop added " + event_name);
        res.redirect("ws");
    });
};


// ================================================== //

// to further up the admin interface

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