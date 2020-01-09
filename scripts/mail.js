const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const async = require("async");

mongoose.connect("mongodb://localhost/dhishna");

const User = require("../models/user.model");

function sendMail() {
    async.waterfall([
        function(done) {
            User.find({}, function(err, users) {
                allUsers = [];
                users.forEach(function(user) {
                    allUsers.push({email : user.username, name : user.name});
                });
                done(err, allUsers);
            });
        },
        function(allUsers, done) {
            console.log(allUsers);
            let smtpTransport = nodemailer.createTransport({
                host : 'smtp.zoho.com',
                auth : {
                    user : 'hr@dhishna.org',
                    pass : process.env.PASSWORD
                }
            });

            allUsers.forEach(function(user) {
                let msg = {
                    to : user.email,
                    from : 'hr@dhishna.org',
                    subject : 'Register for Dhishna Workshops!',
                    html : `Hey ${user.name}
                    
                    <p>It's great that you registered to Dhishna 2020, but if you haven't done so already register for our awesome workshops.
                    Here are the links to them</p>

                    <!--// ** TODO : Add a bit of discription for every workshop ** //-->
                
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5f/knowmore">Cyber Warfare</a>
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5d/knowmore">Ducati</a>
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5c/knowmore">Humanoid Robot</a>
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5e/knowmore">Mecedese Benz overhaul</a>
                    
                    <p>Lookout for more exciting workshops to come at https://dhishna.org/workshop</p> 

                    <!--// ** Psst.. All these workshops are IIT certified ;) are they? ** //-->

                    <p>Looking forward to seeing you at one of our events.</p>

                    <p>Regards
                    Dhishna 2020</p>`
                }

                smtpTransport.sendMail(msg, function(err) {
                    if (err) console.log(err);
                    else console.log('mail sent to', email); 
                    
                    done('done');
                });
            });
        }
    ], function(err) {
        return console.log(err);
    });
}



// ================================================================ //


// testing sending mail with zoho
function mailer() {
    console.log("called mailer");

    let smtpTransport = nodemailer.createTransport({
        host : 'smtp.zoho.com',
        auth : {
            user : 'hr@dhishna.org',
            pass : 'jWjdhjdkhjkf'
        }
    });

    // emails = ['martingeo15@gmail.com', 'tech.dhishna@gmail.com', 'dhishna2020@gmail.com']

    let msg = {
        to : 'jjdlkjlks@abs.com',
        from : 'hr@dhishna.org',
        subject : 'test',
        html : `<p>Hey there!
        It's amazing that you registered for Dhishna 2020. We have some amazing workshops for you.
        <ul>
            <li><a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5f/knowmore">Cyber Warfare</a></li>
            <li><a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5d/knowmore">Ducati</a></li>
            <li><a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5c/knowmore">Humanoid Robot</a></li>
            <li><a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5e/knowmore">Mecedese Benz overhaul</a></li>
        </ul>           

        Join in and register for dhishna now!</p>

        Regards,
        Dhishna 2020
        `
    }

    smtpTransport.sendMail(msg, function(err) {
        if (err) console.log(err);
        else console.log("mail sent");
    });
}



// ================================================================== //



// checking user emails and name

function getEmails() {
    // list of users
    myUsers = [];
    // find each user
    User.find({}, function(err, users) {
        if (err) return console.log(err);
        users.forEach(function(user) {
            myUsers.push({
                name : user.name,
                email : user.username
            });
        });
        console.log(myUsers);
    });
}

//getEmails();

// mailer();

// sendMail();

function sendMail() {
    async.waterfall([
        function(done) {
            User.find({}, function(err, users) {
                allUsers = [];
                users.forEach(function(user) {
                    allUsers.push({email : user.username, name : user.name});
                });
                done(err, allUsers);
            });
        },
        function(allUsers, done) {
            console.log(allUsers);
            let smtpTransport = nodemailer.createTransport({
                host : 'smtp.zoho.com',
                auth : {
                    user : 'hr@dhishna.org',
                    pass : process.env.PASSWORD
                }
            });

            allUsers.forEach(function(user) {
                let msg = {
                    to : user.email,
                    from : 'hr@dhishna.org',
                    subject : 'Register for Dhishna Workshops!',
                    html : `Hey ${user.name}
                    
                    <p>It's great that you registered to Dhishna 2020, but if you haven't done so already register for our awesome workshops.
                    Here are the links to them</p>

                    <!--// ** TODO : Add a bit of discription for every workshop ** //-->
                
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5f/knowmore">Cyber Warfare</a>
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5d/knowmore">Ducati</a>
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5c/knowmore">Humanoid Robot</a>
                    <a href="https://dhishna.org/workshop/5e08429c8ece7f639db3bd5e/knowmore">Mecedese Benz overhaul</a>
                    
                    <p>Lookout for more exciting workshops to come at https://dhishna.org/workshop</p> 

                    <!--// ** Psst.. All these workshops are IIT certified ;) are they? ** //-->

                    <p>Looking forward to seeing you at one of our events.</p>

                    <p>Regards
                    Dhishna 2020</p>`
                }

                smtpTransport.sendMail(msg, function(err) {
                    if (err) console.log(err);
                    else console.log('mail sent to', email); 
                    
                    done('done');
                });
            });
        }
    ], function(err) {
        return console.log(err);
    });
}