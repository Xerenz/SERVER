const Accommodation = require("../models/accommodation.model");
const User = require("../models/user.model");

const nodemailer = require("nodemailer");

exports.show = function(req, res) {
    res.render("accommodation/accommodation");    
};


exports.webhook = function(req, res) {
    const dict = {
        "Accommodation1 (Male)" : ["M", "20/02/2020"],
        "Accommodation2 (Male)" : ["M", "21/02/2020"],
        "Accommodation1 (Female)" : ["F", "20/02/2020"],
        "Accommodation2 (Female)" : ["F", "21/02/2020"]
    };

    let genInfo = dict[req.body.offer_title];

    let doc = new Accommodation({
        name : req.body.buyer_name,
        email : req.body.buyer,
        phone : req.body.buyer_phone,
        payment_id : req.body.payment_id,
        quantity : req.body.quantity,
        gender : genInfo[0],
        date : genInfo[1]
    });

    doc.save(function(err) {
        if (err) return console.log(err);

        smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                pass : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Dhishna 2020  |  Accommodation",
            text : `Hi,
            
This mail confirms your accomodation for Dhishna 2020 on the date ${genInfo[1]}. For any further details please contact Mufnas Muneer : 8606797536


Regards,
Dhishna 2020`
        };

        User.updateOne({username : req.body.buyer},
            {$set : {AccApplied : "true"}, $push : {AccDate : genInfo[1]}}, 
            function(err, user) {
                if (err) return console.log(err);

                console.log(user);

                smtpTransport.sendMail(msg, function(err) {
                    if (err) return console.log(err);

                    console.log("Mail sent to", req.body.buyer_name);

                    res.sendStatus(200);
                });
            
            });

    });
};