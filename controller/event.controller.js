const Events = require("../models/event.model");


// show all

exports.event_show = function(req, res) {
    Events.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.redirect("/");
        }
        console.log(events);
        res.render("event", {events : events});
    });
};


// search for events by label

exports.label_show = function(req, res) {
    Events.find({label : req.params.label}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};


exports.event_one_show = function(req, res) {
    var id = req.params.id; 
    console.log(id)
    Events.findOne({_id:id}, function(err, event) {
        console.log(event)
        if (err) {
            console.log(err);
            return res.redirect("/event");
        }
                
        if(req.user)
        {
            qstring = "?data_name="+req.user.name+"&data_email="+req.user.username+"&data_phone="+req.user.phone+"&data_readonly=data_name&data_readonly=data_email&data_readonly=data_phone";
            res.render("event_details",{event : event,logStatus:true, q: qstring});
        }
        else
        {
            res.render("event_details",{event : event,logStatus:false});
        }
    });
};
