const User = require('../models/user.model');
const Transaction = require("../models/transaction.model");
const Event = require("../models/event.model");
const Workshop = require("../models/ws.model");   

const async = require("async");

exports.data_show =  (req,res) => {
    Transaction.find({payment_for : req.params.event}, (err,docs) => {
        if(err) return console.log(err);
        let mails = [];
        
        docs.forEach(doc => {
            mails.push(doc.buyer);
        });

        User.find({ username: {$in : mails}}, (err,data) => {
            if(err) return console.log("Error");
            
            res.render("manager/manager", {data : data});
            // res.send(data);
        });

    });
}

exports.branch_show = function(req, res) {
    async.waterfall([
        function(done) {
            eventNames = [];
            Event.find({branch : req.params.branch, isOpen : "true"}, function(err, events) {
                events.forEach(function(event) {
                    eventNames.push(event.name);
                });

                done(err, eventNames);
            });
        },
        function(eventNames, done) {
            workshopNames = [];
            Workshop.find({branch : req.params.branch }, function(err, workshops) {
                workshops.forEach(function(ws) {
                    workshopNames.push(ws.name);
                });

                let list = eventNames.concat(workshopNames);

                done(err, list);
            });
        }
    ], function(err, list) {
        if (err) return console.log(err);

        // res.send(list);
        res.render("manager/Dash",{list:list})
    });
    
};