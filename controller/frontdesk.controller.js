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

            res.render("onday/Front_desk_home", {data : branchAll});
        });
    });
};

exports.registration_show = function(req, res) {
    Main.find({event : req.params.event}, function(err, docs) {
        res.render("onday/Front_desk_list", {data : docs , event : req.params.event ,branch : req.params.branch});
    });
};


exports.registration_workshop_show = function(req, res) {
    Main.find({event : req.params.event},null,{sort: {name: 1}}, function(err, docs) {

        if (err) {
                return console.log(err);
            }


        Workshop.find({name : req.params.event}, function(err, workshop) {
                if (err) {
                    return console.log(err);
                }
                let status = workshop[0].isOpen;

                res.render("onday/Frontdesk_workshop_list", {data : docs, 
                    branch : req.params.branch, 
                    event : req.params.event, 
                    status : status});
            });
        
    });
};




exports.registration_spot_detail = function(req,res){
    res.render("onday/Frontdesk_new",{branch:req.params.branch, event:req.params.event});
};

exports.registration_spot_insert = function(req,res){
    let doc = new Main({
       name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        event : req.params.event,
        inst : req.body.inst,
        isSpot : "true",
        isAttended : "true",
        payment_id : Date().toString() + req.body.name
    });

    doc.save(function(err) {
        if (err) {
            console.log(err)
            return res.redirect("/frontdesk/"+req.params.branch+"/"+req.params.event+"/workshop/");
        }

        res.redirect("/frontdesk/"+req.params.branch+"/"+req.params.event+"/workshop/");        
    });
};



exports.registration_update_detail = function(req,res){
    Main.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.redirect("/frontdesk/"+req.params.branch+"/"+req.params.event+"/new/");        
        }

        res.render("onday/frontdesk_edit", {data : doc, branch: req.params.branch});        
    });
};


exports.registration_update_insert = function(req,res){
    Main.findByIdAndUpdate(req.params.id, {
        $set : {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            inst : req.body.inst
        },
    }, function(err, doc) {
        if (err) {
            return res.redirect("/frontdesk/"+req.params.branch+"/"+req.params.event+"/update/"+req.params.id);            
        }

        return res.redirect("/frontdesk/"+req.params.branch+"/"+req.params.event+"/workshop/");                
    });
};