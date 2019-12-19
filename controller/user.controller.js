const User = require("../models/user.model");
const Admin = require("../models/admin.model");

exports.user_register = function(req, res) {
    res.render("register");
};

exports.user_post_register = function(req, res) {
    Admin.register(new Admin({
        username : req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        });
    });
};