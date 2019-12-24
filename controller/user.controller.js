const User = require("../models/user.model");
const passport = require("passport");
const localStrategy = require("passport-local");


// config auth
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================================== static ==================================== //



// to load static pages

exports.home = function(req, res) {
    console.log("home");
    res.render("home");
};

exports.about = function(req, res) {
    res.render("about");
};

exports.contact = function(req, res) {
    res.render("contact");
};

exports.outreach = function(req, res) {
    res.render("outreach");
};


// ================================== user-auth ==================================== //



// profile page

exports.user_profile = function(req, res) {
    res.render("user/profile", {user : req.user});
};

exports.user_loginstate = function(req, res, next) {
    if (req.isAuthenticated()) 
        return next();
    res.redirect("/login");
};



// sign up

exports.user_signin = function(req, res) {
    res.render("user/register");
};

exports.user_register = function(req, res) {
    User.register(new User({
        // auth info
        username : req.body.username,

        // personal info
        name : req.body.name,
        phone : req.body.phone,
        inst : req.body.inst

        // registration info

    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("user/register");
        }

        // user created
        res.redirect("/profile");
    });
};


// login

exports.user_login = function(req, res) {
    let message = "Login Here!";
    if (req.isAuthenticated())
        message = "Login as another user?";
    res.render("user/login", {message : message});
};

exports.user_auth = function(req, res, next) {
    passport.authenticate("local", {
        successRedirect : "/profile",
        failureRedirect : "/login"
    });
    next();
};

exports.user_loginset = function(req, res) {
    // final handle
    res.redirect("/profile");
};
