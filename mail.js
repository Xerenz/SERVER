const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const async = require("async");

const User = require("./models/user.model");

function sendMailtoUsers() {
    async.waterfall([
        function(done) {
            console.log("1st function");
            User.find({}, function(err, users) {
                if (err) console.log(err);
                console.log("found users");
                done(err, users);
            });
            console.log("some problemooo");
        },
        function(users, done) {
            console.log("2nd function");
            emails = [];
            users.forEach(function(user) {
                console.log("pushing user to email..", user.username);
                emails.push(user.username);
            });
            done(err, emails);
        },
        function(emails, done) {
            console.log("3rd function");
            emails.forEach(function(email) {
                console.log(email);
            });
            done(err, 'done');
        }
    ], function(err) {
        if (err) return console.log(err);
    });
}

function test() {
    async.waterfall([
        function(done) {
            User.findOne({username : "martingeo15@gmail.com"}, function(err, user) {
                done(err, user);
            })
        },
        function(user, done) {
            console.log(user);
            done(err, 'done');
        }
    ], function(err) {
        return console.log(err);
    });
}

test();