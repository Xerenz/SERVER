const Workshop = require("../models/ws.model");
const Transaction = require("../models/transaction.model");


const request = require("request");


// show all events

exports.ws_show = function(req, res) {
    Workshop.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
                
        if(req.user)
        {
            res.render("workshop",{events : events,logStatus:true});
        }
        else
        {
            res.render("workshop",{events : events,logStatus:false});
        }
       
    });
};


// search for events by label

exports.label_show = function(req, res) {
    Workshop.find({label : req.params.label}, function(err, events) {
        if (err) {
            console.log(err);
            return res.render("home");
        }
        console.log(events);
        res.render("workshop", {events : events});
    });
};


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
        return res.redirect("https://test.instamojo.com/dhishna2020/workshop-3/" + qstring + qinstruc); // instamojo
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login"); // unauthorized user
};



// webhook
exports.webhook = function(req, res) {
    console.log(req);

    if (req.body.status === 'Credit') {
    
       /*let payment = new Transaction({
            payment_id : req.body.payment_id,
            status : req.body.status,
            payment_for : req.body.offer_title,
            buyer : req.body.buyer
        }); */

        console.log("Transaction was credit");

        Workshop.findOne({name : req.body.offer_title}, function(err, event) {
            if (err)
                console.log(err);
            else {
                // console.log(event.id);

                // add event to user

                User.updateOne({username : req.body.buyer},
                    {"$push" : {"ws" : "hdgdgfghfohrofkf"}}, // test event change on deploy
                        function(err, user) {
                    if (err)
                        console.log(err);
                    else {
                        console.log("event added to user.."); 
                        
                        var payment = new Transaction({

                            // transaction info
                            payment_id : req.body.payment_id,
                            status : req.body.status,
                            payment_for : req.body.offer_title,
                            buyer : req.body.buyer,

                            // saving unique id
                            uid : user.id
                        }); 

                        payment.save(function(err) {
                            if (err)
                                console.log(err);
                            else {
                                console.log("payment saved", req.body.buyer, req.body.payment_id, 
                                req.body.offer_title);
                            }
                        }); 
                    } 
        
                }); 
            }
        });       

        console.log(req.user);

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
    console.log(req);


    if (req.query.status === 'success') {

        console.log("payment was a success");

        Transaction.find({payment_id : req.query.payment_id}, function(err, doc) {
            if (err)
                console.log(err);
            if (doc.length === 0) {
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
                    if (err)
                        console.log(err);
                    else {
                        console.log(event.id);
        
                        // add event to user
        
                        User.updateOne({username : req.body.buyer},
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
                        console.log("payment saved", req.body.payment_id, 
                        req.body.offer_title);
                    }
                }); 
                // }); 
            }
            // check if payment saved via webhook //
            else {
                console.log("payment saved by webhook...");
            }

            res.redirect("/");
        });
    }
    // check if transaction was a success //
    else {
        console.log("failed transaction...");
    }

    
};


