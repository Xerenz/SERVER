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
                auth : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Promenad  |  SPOTLIGHT",
            text : `Hey ${req.body.buyer_name},
            
            Thank you for registering for Promenad!`
        };

        smtpTransport.sendMail(msg, function(err) {
            if (err) 
            {
                res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }
        });

        // Field_8541 - for college

        let doc = new Promenad(
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
        });
    }

    else {
        res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."})
    }
}


exports.step_up_solo_webhook = function(req, res) {

    if (req.body.status === "Credit") {
        let smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                auth : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Step Up Solo  |  SPOTLIGHT",
            text : `Hey ${req.body.buyer_name},
            
            Thank you for registering for Promenad!`
        };

        smtpTransport.sendMail(msg, function(err) {
            if (err) 
            {
                res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }
        });

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
                res.render("message", {message1 : "Oops there was some technical issue", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }
        });
    }

    else {
        res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."})
    }
}


exports.ragarhapsody_webhook = function(req, res) {

    if (req.body.status === "Credit") {
        let smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                auth : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Step Up Solo  |  SPOTLIGHT",
            text : `Hey ${req.body.buyer_name},
            
            Thank you for registering for Promenad!`
        };

        smtpTransport.sendMail(msg, function(err) {
            if (err) 
            {
                res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
            }
        });

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
        });
    }

    else {
        res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."})
    }
}
