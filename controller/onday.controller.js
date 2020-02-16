const Main = require("../models/main.model");
const Event = require("../models/event.model");
const Workshop = require("../models/ws.model");

const async = require("async");



exports.registration_show = function(req, res) {
    Main.find({event : req.params.event}, function(err, docs) {
        res.render("onday/onday_list", {data : docs , event : req.params.event ,branch : req.params.branch});
    });
};


exports.registration_spot_detail = function(req,res){

    
}

exports.registration_spot_insert = function(req,res){

    
}

exports.registration_update_detail = function(req,res){


}

exports.registration_update_insert = function(req,res){


}

exports.registration_attended_mark = function(req,res){


}

exports.registration_winner_mark = function(req,res){

    
}