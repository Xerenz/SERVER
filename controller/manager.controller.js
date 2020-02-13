const User = require('../models/user.model');
const Transaction = require('../models/transactions.model');

exports.data_show =  (req,res) => {
        Transaction.find({payment_for : req.params.event}, (err,docs) => {
            if(err) return console.log(err);
                let mails = [];
                docs.forEach(doc => {
                    mails.push(doc.email);
                });

        User.find({ username: {$in : mails}}, (err,data) => {
            if(err) return console.log("Error");
            
            res.render("", {data : data});
        });

    });
}