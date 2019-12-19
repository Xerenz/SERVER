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
const userRoutes = require("./routes/user.route");

const Admin = require("./models/admin.model");

const app = express();

app.set("view engine", "ejs");

app.use("/events", eventRoutes);
app.use("/workshops", wsRoutes);
app.use("/exhibitions", exhibitionRoutes);
app.use("/user", userRoutes);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
    secret: "Enter a secret key here",
    resave: false,
    saveUninitialized: false
}));
passport.use(new localStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.get("/", function(req, res) {
    res.render("index");
})

app.listen(8000, function() {
    console.log("listening to port 8000");
});