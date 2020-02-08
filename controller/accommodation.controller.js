// const Promenad = require("../models/promenad.model");


// const nodemailer = require("nodemailer");

exports.show = function(req, res) {
    res.render("accommodation/accommodation");    
};


// exports.redirect = function(req, res) {
//     res.redirect("/thankyou");
// };



// exports.ragarhapsody_webhook = function(req, res) {

//     if (req.body.status === "Credit") {
        

//         // Field_8541 - for college

//         let doc = new Ragarhapsody(
//             {
//                 name : req.body.buyer_name,
//                 email : req.body.buyer,
//                 phone : req.body.buyer_phone,
//             }
//         );

//         doc.save(function(err) {
//             if (err) 
//             {
//                 res.render("message", {message1 : "Oops there was some technical issue", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
//             }

//             smtpTransport.sendMail(msg, function(err) {
//                 if (err) 
//                 {
//                     return res.render("message", {message1 : "Oops there was some trouble sending you the confirmation mail.", message2 : "Your registration is complete so there is no need for you to worry. For any queries contact us."})
//                 }

//                 res.sendStatus(200);
//             });

//         });
//     }

//     else {
//         res.render("message", {message1 : "Oops there was some trouble regarding your payment. Please try again later.", message2 : "If any amount was refunded please contact us."})
//     }
// };
