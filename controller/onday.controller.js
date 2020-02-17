const Main = require("../models/main.model");
const Event = require("../models/event.model");
const Workshop = require("../models/ws.model");

exports.registration_show = function(req, res) {
    Main.find({event : req.params.event}, function(err, docs) {
        if (err) return console.log(err);

        Event.find({name : req.params.event}, function(err, event) {

            if (err) return console.log(err);

            if (!event) {
                Workshop.find({name : req.params.event}, function(err, event) {
                    status = event.isOpen;
                });
            }
            else {
                status = event.isOpen;
            }
            res.render("onday/onday_list", {data : docs , event : req.params.event ,branch : req.params.branch, status : status});
        });
    
    });
};


exports.registration_spot_detail = function(req,res){
    res.render("onday/onday_new",{branch:req.params.branch, event:req.params.event});
};

exports.registration_spot_insert = function(req,res){
    let doc = new Main({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        event : req.params.event,
        inst : req.body.inst,
        isSpot : "true",
        isAttended : "true"
    });

    doc.save(function(err) {
        if (err) {
            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/new/");
        }

        res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");        
    });
};


exports.registration_update_detail = function(req,res){
    Main.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/new/");        
        }

        res.render("onday/onday_edit", {data : doc, branch: req.params.branch});        
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
            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/update/"+req.params.id);            
        }

        return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");                
    });
};


exports.registration_attended_mark = function(req,res){
    Main.findByIdAndUpdate(req.params.id, 
        {
            $set : {isAttended : "true"}
        }, function(err, doc) {
            if (err) {
                return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");        
            }

            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");        
        });
}

exports.registration_winner_mark = function(req,res){
    Main.findByIdAndUpdate(req.params.id, {
        $set : {
            isWinner : "true",
            rank : req.params.rank
        }
    }, function(err, doc) {
        if (err) {
            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");        
        }

        return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");        
    });    
};
