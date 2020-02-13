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

    if (req.body.offer_title === "Accommodation1 (Male)")
    {
        var gender = "M";
        var date = "20/02/2020";
    }
    else if (req.body.offer_title === "Accommodation2 (Male)")
    {
        gender = "M";
        date = "21/02/2020";
    }
    else if (req.body.offer_title === "Accommodation1 (Female)")
    {
        gender = "F";
        date = "20/02/2020";
    }
    else 
    {
        gender = "F";
        date = "21/02/2020";
    }

    let doc = new Accommodation({
        name : req.body.buyer_name,
        email : req.body.buyer,
        phone : req.body.buyer_phone,
        payment_id : req.body.payment_id,
        quantity : req.body.quantity,
        gender : gender,
        date : date
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
            
This mail confirms your accomodation for Dhishna 2020 on the date ${date}. For any further details please contact Mufnas Muneer : 8606797536


Regards,
Dhishna 2020`
        };

        User.updateOne({username : req.body.buyer},
            {$set : {AccApplied : "true"}, $push : {AccDate : date}}, 
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