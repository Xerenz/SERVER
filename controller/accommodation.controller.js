const Accommodation = require("../models/accommodation.model");

const nodemailer = require("nodemailer");

exports.show = function(req, res) {
    res.render("accommodation/accommodation");    
};


exports.webhook = function(req, res) {
    const dict = {
        "Accommodation1" : "M",
        "Accommodation2" : "M",
        "Accommodation_1" : "F",
        "Accommodation_2" : "F"
    };

    let gender = dict[req.body.offer_title];

    let doc = new Accommodation({
        name : req.body.buyer_name,
        email : req.body.buyer,
        phone : req.body.buyer_phone,
        payment_id : req.body.payment_id,
        quantity : req.body.quantity,
        gender : gender
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
            subject : "Dhishna 2020  |  Accomodation",
            text : `Hi,
            
This mail confirms your accomodation for Dhishna 2020. For any further details please contact Mufnas Muneer : 8606797536

Regards,
Dhishna 2020`
        };

        smtpTransport.sendMail(msg, function(err) {
            if (err) return console.log(err);

            console.log("Mail send to", req.body.buyer_name);

            res.sendStatus(200);
        });

    });
};