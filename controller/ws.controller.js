const Workshop = require("../models/ws.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Main = require("../models/main.model");

const async = require("async");
const nodemailer = require("nodemailer");


// show all events

exports.ws_show = function(req, res) {
    Workshop.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.redirect("/");
        }
                
        if(req.user)
        {
            qstring = "?data_name="+req.user.name+"&data_email="+req.user.username+"&data_phone="+req.user.phone+"&data_readonly=data_name&data_readonly=data_email&data_readonly=data_phone";
            res.render("workshop",{events : events,logStatus:true, q: qstring});
        }
        else
        {
            res.render("workshop",{events : events,logStatus:false});
        }
       
    });
};

//show workshop

exports.ws_one_show = function(req, res) {
    var id = req.params.id; 
    console.log(id)
    Workshop.findOne({name:id}, function(err, event) {
        console.log(event)
        if (err) {
            console.log(err);
            return res.redirect("/workshop");
        }
                
        if(req.user)
        {
            qstring = "?data_name="+req.user.name+"&data_email="+req.user.username+"&data_phone="+req.user.phone+"&data_readonly=data_name&data_readonly=data_email&data_readonly=data_phone";
            res.render("workshop_details",{event : event,logStatus:true, q: qstring});
        }
        else
        {
            res.render("workshop_details",{event : event,logStatus:false});
        }
    });
};


// search for events by label

exports.label_show = function(req, res) {
    Workshop.find({label : req.params.label}, function(err, events) {
        if (err) {
            console.log(err);
            return res.redirect("/");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};

exports.thankyou = function(req, res) {
    res.render("thankyou");
}

// experimental
exports.ws_loginandpay = function(req,res){
    req.session.redirectTo = '/account';
    res.redirect('/login')
}


// =================================== manage workshop payments =========================== //



// pay button was clicked
exports.payment = function(req, res) {
    if (req.user) {

        console.log("user exists");

        name = req.user.name;
        email = req.user.username;
        phone = req.user.phone;

        // string manipulation

        qstring = "?data_name=" + name + "&data_email=" + email + "&data_phone=" + phone;
        qinstruc = "&data_readonly=data_name&data_readonly=data_email&data_readonly=data_phone";
        return res.redirect("https://test.instamojo.com/dhishna2020/mercedes-benz-engine-diagnosis-and-overhauli-41923/" + qstring + qinstruc); // instamojo
    }

    console.log(req.session);
    req.session.returnTo = req.originalUrl;
    res.redirect("/login"); // unauthorized user
};


exports.webhook = function(req, res) {
    async.waterfall([
        function(done) {
            if (req.body.status === "Credit") {
                let doc = new Transaction({
                    payment_id : req.body.payment_id,
                    payment_for : req.body.offer_title,
                    status : req.body.status,
                    buyer : req.body.buyer,
                    name : req.body.buyer_name,
                    phone : req.body.buyer_phone
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
                    {"$push" : {"ws" : req.body.offer_title}}, 
                    function(err, user) {
                        console.log(user);
                        done(err);
                });

            }
        },
        function(done) {
            if (req.body.status === "Credit") {
                smtpTransport = nodemailer.createTransport({
                    service : "Gmail",
                    auth : {
                        user : "tech.dhishna@gmail.com",
                        pass : "JyothisDance@1337"
                    }
                });

                Workshop.findOne({name : req.body.offer_title}, function(err, workshop) {
                    if (err)
                    {
                        return console.log(err);
                    }

                    if (!workshop) {
                        return console.log("No workshop");
                    }

                    let msg = {
                        to : req.body.buyer,
                        from : "Dhishna <tech.dhishna@gmail.com>",
                        subject : `DHISHNA  |  ${req.body.offer_title.toUpperCase()}`,
                        text : `Hey ${req.body.buyer_name},
                        
Thank you for registering for ${req.body.offer_title} workshop. This mail confirms your registeration. The workshop is scheduled to be held on ${workshop.date}.

For any queries or details about the workshop contact:
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
            let main = new Main({
                name : req.body.buyer_name,
                phone : req.body.buyer_phone,
                email : req.body.buyer,
                event : req.body.offer_title,
                payment_id : req.body.payment_id
            });

            main.save(function(err) {
                if (err) {
                    return console.log(err);
                }

                done(err);
            });
        },
        function(done) {
            res.sendStatus(200);
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
