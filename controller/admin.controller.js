const Exhibition = require("../models/exhibition.model");
const FreeEvent = require("../models/freeEve.model");
const PaidEvent = require("../models/paidEve.model");
const Workshop = require("../models/ws.model");


// Controller for all view requests

exports.admin_panel = function(req, res) {
    res.render("admin/admin");
};

exports.admin_create_ws = function(req, res) {
    res.render("admin/wsCreate", {ws : ''});
};

exports.admin_wsbybranch = function(req, res) {
    Workshop.find({branch : req.params.branch}, function(err, wsArray) {
        workshops = []
        wsArray.forEach(function(ws) {
            workshop.push({name : ws.name, id : ws.id});
        });
        res.render("admin/wsUpdate", {workshops : workshops});
    });
};

exports.admin_update_ws = function(req, res) {
    Workshop.findById(req.params.id, function(err, ws) {
        if (err) return console.log(err);
        res.render("admin/wsUpdate", {ws : ws});
    });
};

// Controller for creating workshops

exports.create_workshop = function(req, res) {
    let workshop = new Workshop({
        name : req.body.name,
        branch : req.body.branch,
        price : req.body.price,
        date : req.body.date,
        content : req.body.content,

        contact : [{
            name : req.body.contactname1,
            phone : req.body.contactphone1
        }, 
        {
            name : req.body.contactname2,
            phone : req.body.contactphone2
        }],

        message : req.body.message,
        isOpen : true,
        details : req.body.details,
        pdfUrl : req.body.pdf,
        url : req.body.url
    }); 

    console.log(workshop);

    workshop.save(function(err) {
        if (err) console.log(err);
        else console.log("Workshop saved to db");

        // do a redirect with a message
    });
};

exports.update_workshop = function(req, res) {
    Workshop.findByIdAndUpdate(req.params.id, {
            "$set" : {name : req.body.name},
            "$set" : {branch : req.body.branch},
            "$set" : {label : req.body.label},
            "$set" : {content : req.body.content},
            "$set" : {price : req.body.price},
            "$set" : {date : req.body.date},

            "$set" : {contact : [{
                    name : req.body.contactname1,
                    phone : req.body.contactphone1
                },
                {
                    name : req.body.contactname2,
                    phone : req.body.contactphone2
                }
            ]},

            "$set" : {message : req.body.message},
            "$set" : {details : req.body.details},
            "$set" : {pdfUrl : req.body.pdf},
            "$set" : {url : req.body.url},
        }, 
        function(err, ws) {
        if (err) return console.log(err);
        // check for open state
        let state = true;
        if (req.body.state === "Close") state = false;
        
        ws.isOpen = state;

        ws.save(function(err) {
            if (err) return console.log(err);
            // do a redirect
        });
    });
}
