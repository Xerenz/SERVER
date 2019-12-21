const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1/test");

const eventRoutes = require("./routes/event.route");
const wsRoutes = require("./routes/ws.route");
const exhibitionRoutes = require("./routes/exhibition.route");
const adminRoutes = require("./routes/admin.route");


// to work on registration
const Admin = require("./models/admin.model");

const app = express();

app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));

// Config all requirements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
    secret: "Enter a secret key here",
    resave: false,
    saveUninitialized: false
}));

// config parent routes
app.use("/event", eventRoutes);
app.use("/workshop", wsRoutes);
app.use("/exhibition", exhibitionRoutes);
app.use("/SantyDance", adminRoutes);


// to work on registration
passport.use(new localStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// ======================================================= //

// to load static pages
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
})

app.get("/outreach", function(req, res) {
    res.render("outreach");
});

app.listen(8000, function() {
    console.log("listening to port 8000");
});