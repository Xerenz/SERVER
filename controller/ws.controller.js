const Workshop = require("../models/ws.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");


const request = require("request");


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
    Workshop.findOne({_id:id}, function(err, event) {
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



// webhook
exports.webhook = function(req, res) {

    if (req.body.status === 'Credit') {
    
       /*let payment = new Transaction({
            payment_id : req.body.payment_id,
            status : req.body.status,
            payment_for : req.body.offer_title,
            buyer : req.body.buyer
        }); */

        Transaction.findOne({payment_id : req.body.payment_id}, function(err, doc) {

            if (err) console.log(err);

            else if (!doc) {

                console.log("Transaction was credit");

                console.log(req.body.offer_title);

                console.log(req.body);

                Workshop.findOne({name : req.body.offer_title}, function(err, event) {
                    if (err)
                        console.log(err);
                    else if (!event) 
                        console.log("No event found");
                    else {
                        // console.log(event.id);

                        // add event to user

                        User.updateOne({username : req.body.buyer},
                            {"$push" : {"ws" : event.id}}, // test event change on deploy
                                function(err, user) {
                            if (err) console.log(err);
                            else if (!user) console.log("no user found");
                            else {
                                console.log("event added to user.."); 
                                
                                console.log(user.id); // testing

                                var payment = new Transaction({

                                    // transaction info
                                    payment_id : req.body.payment_id,
                                    status : req.body.status,
                                    payment_for : req.body.offer_title,
                                    buyer : req.body.buyer,

                                    // saving unique id
                                    uid : user.id
                                }); 

                                console.log(payment); // testing

                                payment.save(function(err) {
                                    if (err)
                                        console.log(err);
                                    else {
                                        console.log("payment saved", req.body.buyer, req.body.payment_id, 
                                        req.body.offer_title);
                                    }
                                }); 

                                console.log(user); // check user state
                            } 
                        });
                
                    } 
                });

            }

            else {
                console.log("doc already added by redirect");

                doc.payment_for = req.body.offer_title;
                doc.buyer = req.body.buyer;

                doc.save(function(err) {
                    console.log(err);
                });

                // adding event to user

                // needs correction //
                Workshop.findOne({name : req.body.offer_title}, function(err, event) {
                    if (err) console.log(err);
                    else if (!event) console.log("no event found");
                    else {
                        User.updateOne({username : req.body.buyer}, {"$push" : {"ws" : event.id}}, 
                        function(err, user) {
                            if (err)
                                console.log(err);
                            else {
                                console.log("Event pushed to user");
                                console.log(user);
                            }
                        });
                    }
                });
            }
        });       

        /*payment.save(function(err) {
            if (err)
                console.log(err);
            else {
                console.log("payment saved", req.body.buyer, req.body.payment_id, 
                req.body.offer_title);
            }
        }); */
    }

    else {
        console.log("transaction failed");
    }
};


// redirect after success
exports.redirect =  function(req, res) {

    if (req.query.status === 'success') {

        console.log("payment was a success");

        Transaction.findOne({payment_id : req.query.payment_id}, function(err, doc) {
            if (err)
                console.log(err);
            if (!doc) {
                console.log("Not saved via webhook..");

                // let url = "https://test.instamojo.com/api/1.1/payment-requests/"
                // let payload = {}
                // let headers = {'X-Api-Key': 'test_33e8cff1c7771aa97518b6bbf70', 'X-Auth-Token': 'test_a2981cf2689df276c8dc7d732d7'};

                // console.log(req.payment_request.id);


                // need main payment id of format : d66cb29dd059482e8072999f995c4eef
                // payment_id is of format : MOJO5a06005J21512197
                /* request.get(url + req.query.payment_id, 
                {form : payload, headers : headers},
                function(err, res, body) { */

                    // if (err)
                    //    console.log(err);

                    // console.log(body);

                    // console.log(req.user);

                let payment = new Transaction({

                    // payment info
                    payment_id : req.query.payment_id,
                    status : req.query.status,

                    // user id
                    uid : req.user.id
                });

                    
                Workshop.findOne({name : req.body.offer_title}, function(err, event) {
                    if (err || !event) {
                        err_mess = err || "no event found"
                        console.log(err_mess);
                    }
                    else {
                        // console.log(event.id);
        
                        // add event to user
        
                        User.updateOne({username : req.user.username},
                            {"$push" : {"ws" : event.id}},
                                function(err, user) {
                            if (err)
                                console.log(err);
                            else {
                                console.log("event added to user..");   
                            } 
                        }); 
                    }
                });       
            
                payment.save(function(err) {
                    if (err)
                        console.log(err);
                    else {
                        console.log("payment saved", req.query.payment_id);
                    }
                }); 
                // }); 
            }
            // check if payment saved via webhook //
            else {
                console.log("payment saved by webhook...");
            }

            res.redirect("/thankyou");
        });
    }
    // check if transaction was a success //
    else {
        console.log("failed transaction...");

        res.redirect("/"); // redirect to home after fail
    }

    
};


