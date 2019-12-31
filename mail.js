const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const async = require("async");

mongoose.connect("mongodb://localhost/dhishna");

const User = require("./models/user.model");

function sendMail() {
    async.waterfall([
        function(done) {
            User.find({}, function(err, users) {
                console.log("found users");
                emails = [];
                users.forEach(function(user) {
                    emails.push(user.username);
                });
                done(err, emails);
            });
        },
        function(emails, done) {
            console.log(emails);
        }
    ], function(err) {
        return console.log(err);
    });
}

function mailer() {
    let smtpTransport = nodemailer.createTransport({
        host : 'smtp.zoho.com',
        auth : {
            user : 'hr@dhishna.org',
            pass : 'jWwxQMR2i2ES'
        }
    });

    emails = ['martingeo15@gmail.com', 'tech.dhishna@gmail.com', 'dhishna2020@gmail.com']

    emails.forEach(function(email) {
        let msg = {
            to : email,
            from : 'mail@dhishna.org',
            subject : 'test',
            text : 'this is sample test'
        }

        smtpTransport.sendMail(msg, function(err) {
            if (err) console.log(err);
            else console.log("mail sent to", email);
        });
    });
}

mailer();