const Events = require("../models/event.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

const async = require("async");
const nodemailer = require("nodemailer");


// show all

exports.event_show = function(req, res) {
    Events.find({isOpen:"true"}, function(err, events) {
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
        res.render("event", {events : events});
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

exports.webhook = function(req, res) {
    async.waterfall([
        function(done) {
            if (req.body.status === "Credit") {
                let doc = new Transaction({
                    payment_id : req.body.payment_id,
                    payment_for : req.body.offer_title,
                    status : req.body.status,
                    buyer : req.body.buyer
                });

                doc.save(function(err) {
                    if (err) 
                    {
                        return console.log(err);
                    }

                    done(err);
                });
            }
        },
        function(done) {
            if (req.body.status === "Credit") {
                User.updateOne({username : req.body.buyer}, 
                    {"$push" : {"events" : req.body.offer_title}}, 
                    function(err, user) {
                        console.log(user);
                        done(err);
                });

            }
        },
        function(done) {
            if (req.body.status === "Credit") {

                Events.findOne({name : req.body.offer_title}, function(err, workshop) {
                    if (err)
                    {
                        return console.log(err);
                    }

                    let msg = {
                        to : req.body.buyer,
                        from : "Dhishna <tech.dhishna@gmail.com>",
                        subject : `DHISHNA  |  ${req.body.offer_title.toUpperCase()}`,
                        text : `Hey ${req.body.buyer_name},
                        
Thank you for registering for ${req.body.offer_title} workshop. This mail confirms your registeration. The workshop is scheduled to be held on ${workshop.date}.

For any queries or details about the workshop contact :
${workshop.contact[0].name} : ${workshop.contact[0].phone}
${workshop.contact[1].name} : ${workshop.contact[1].phone}

For Accomodation details please call Mufnas: 8606797536

Hope to see you on our event day.
    
Cheers!
Dhishna 2020`
                    };
    
                    smtpTransport.sendMail(msg, function(err) {
                        if (err) 
                        {
                            return console.log(err);
                        }
    
                        console.log("mail sent");
                        done(err);
                    });

                });
            }
        },
        function(done) {
            res.sendStatus(200);
            done(err);
        }
    ], function(err) {
        if (err)
        {
            return console.log(err);
        }
    });
};

exports.redirect = function(req, res) {

    if (req.params.status === "success") {
        res.redirect("/thankyou");
    }
    else {
        res.redirect("/events");
    }
};
