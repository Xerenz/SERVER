const Promenad = require("../models/promenad.model");
const Ragarhapsody = require("../models/ragarhapsody.model");
const StepUpSolo = require("../models/step_up_solo.model");

const nodemailer = require("nodemailer");

exports.show = function(req, res) {
    res.render("spotlight");    
};

exports.redirect = function(req, res) {
    res.redirect("/thankyou");
};

exports.promenad_webhook = function(req, res) {

    if (req.body.status === "Credit") {
        let smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                pass : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Promenad  |  SPOTLIGHT",
            text : `Hey ${req.body.buyer_name},
            
Thank you for registering for Promenad!`
        };

        // Field_8541 - for college

        let doc = new Promenad(
            {
                name : req.body.buyer_name,
                email : req.body.buyer,
                phone : req.body.buyer_phone,
            }
        );

        console.log(doc);

        doc.save(function(err) {
            if (err) 
            {
                return res.render("message", {message1 : "Oops there was some technical issue", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }

            console.log("document saved");

            smtpTransport.sendMail(msg, function(err) {
                if (err) 
                {
                    console.log("mail error");
                    console.log(err);
                    return res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
                }
    
                console.log("mail sent");

                res.sendStatus(200);
            });

        });
    }

    else {
        res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."});

        res.sendStatus(200);
    }
}


exports.step_up_solo_webhook = function(req, res) {

    if (req.body.status === "Credit") {
        let smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                pass : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Step Up Solo  |  SPOTLIGHT",
            text : `Hey ${req.body.buyer_name},
            
Thank you for registering for Promenad!`
        };

        // Field_8541 - for college

        let doc = new StepUpSolo(
            {
                name : req.body.buyer_name,
                email : req.body.buyer,
                phone : req.body.buyer_phone,
            }
        );

        doc.save(function(err) {
            if (err) 
            {
                return res.render("message", {message1 : "Oops there was some technical issue", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }

            smtpTransport.sendMail(msg, function(err) {
                if (err) 
                {
                    return res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
                }

                res.sendStatus(200);
            });

        });
    }

    else {
        return res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."});

        res.sendStatus(200);
    }
}


exports.ragarhapsody_webhook = function(req, res) {

    if (req.body.status === "Credit") {
        let smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                pass : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Step Up Solo  |  SPOTLIGHT",
            text : `Hey ${req.body.buyer_name},
            
Thank you for registering for Promenad!`
        };

        // Field_8541 - for college

        let doc = new Ragarhapsody(
            {
                name : req.body.buyer_name,
                email : req.body.buyer,
                phone : req.body.buyer_phone,
            }
        );

        doc.save(function(err) {
            if (err) 
            {
                res.render("message", {message1 : "Oops there was some technical issue", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }

            smtpTransport.sendMail(msg, function(err) {
                if (err) 
                {
                    return res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
                }

                res.sendStatus(200);
            });

        });
    }

    else {
        res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."})
    }
};
