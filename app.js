const express = require("express");
const mongoose = require("mongoose");
const qrcode = require("qrcode");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/dhishna");

// const userRoutes = require("./routes/user.route");
const eventRoutes = require("./routes/event.route");
const wsRoutes = require("./routes/ws.route");
const exhibitionRoutes = require("./routes/exhibition.route");
const adminRoutes = require("./routes/admin.route");



// to work on registration
// const Admin = require("./models/admin.model"); // not required now //

// User db
const User = require("./models/user.model");
// Transaction db
const Transaction = require("./models/transaction.model");

const GetTransaction = Transaction.GetTransaction;
const PostTransaction = Transaction.PostTransaction;

const app = express();

app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));

app.set("view engine", "ejs");

// Config all requirements
app.use(expressSession({
    secret: "Enter a secret key here",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended : false}));
app.use(passport.initialize());
app.use(passport.session());

// config parent routes
app.use("/event", eventRoutes);
app.use("/workshop", wsRoutes);
app.use("/exhibition", exhibitionRoutes);
app.use("/SantyDance", adminRoutes);


// to work on registration

// for user
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ===================================== static ======================================= //


// to load static pages

app.get("/", function(req, res) {
    console.log("home");
    res.render("home");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/outreach", function(req, res) {
    res.render("outreach");
});



// ===================================== auth ======================================== //



app.get("/profile", function(req, res) {
    qrcode.toDataURL(req.user.id, function(err, url) {
        let user = {user_ : req.user, qr : url};
        res.render("user/profile", {user : user});
    });
});

// Register

app.get("/register", function(req, res) {
    res.render("user/register");
});

app.post("/register", function(req, res) {
    User.register(new User({
        // auth info
        username : req.body.username,

        // personal info
        name : req.body.name,
        phone : req.body.phone,
        inst : req.body.inst

    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("user/register");
        }
        console.log("user created " + user.username);
        passport.authenticate("local")(req, res, function() {
            if (req.user) {
                console.log("user authenticated");
                res.redirect("/profile");
            }
        });
    });
});



// Login

app.get("/login", function(req, res) {
    var message = "LogIn Here!"
    if (req.user)
        message = "LogIn with another account?";
    res.render("user/login", {message : message});
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login"
}), function(req, res) {
    // final handler
});


// logout

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});


// middleware for checking user auth
function isLoggedIn(req, res, next) {
    console.log("checking login state");
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


// ============================================== payments ===================================== //


// pay button was clicked
app.get("/payment", function(req, res) {
    if (req.user)
        return res.redirect("https://test.instamojo.com/dhishna2020/workshop-2/"); // instamojo
    res.redirect("/login"); // unauthorized user
});

// webhook
app.post("/api", function(req, res) {
    console.log(req.body);
    
    let payment = new Transaction({
        payment_id : req.body.payment_id,
        status : req.body.status,
        payment_for : req.body.offer_title,
        buyer : req.body.buyer
    });

    User.update({username : req.session.passport.user},
        {"$push" : {"events" : req.body.offer_title}},
         function(err, user) {
        if (err)
            console.log(err);
        else {
            console.log("event added to user..");   
        }
    });

    payment.save(function(err) {
        if (err)
            console.log(err);
        else {
            console.log("payment saved", payment_id, payment_for);
        }
    }); 
});

// redirect after success
app.get("/api", function(req, res) {
    console.log(req.query);
    if (req.query.status === 'success') {

        Transaction.find({payment_id : req.query.payment_id}, function(err, doc) {
            if (err)
                console.log(err);
            if (!doc) {
                console.log("Not saved via webhook..");
                request.get("instamojo url", 
                {form : payload, headers : headers},
                function(err, res, body) {
                    let payment = new PostTransaction({
                        payment_id : req.body.payment_id,
                        status : req.body.status,
                        payment_for : req.body.offer_title,
                        buyer : req.body.buyer
                    });
                    User.update({username : req.session.passport.user},
                        {"$push" : {"events" : req.body.offer_title}},
                         function(err, user) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("Event added for user");
                        }
                    });
                
                    payment.save(function(err) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("payment saved", payment_id, payment_for);
                        }
                        res.redirect("/");
                    }); 
                });
            }
            else {
                console.log("payment saved by webhook...");
            }
        });
    }
    else {
        console.log("failed transaction...");
    }
});



// ============================================================================================== //
// Innovator's summit
app.get("/pay",function(req,res){
  var request= require('request');

var headers = { 'X-Api-Key': 'test_ee288567eaaead41cf2e2fb56d7', 'X-Auth-Token': 'test_834daeb7d8057ccae1359bb9089'}
var payload = {
  purpose: 'FIFA 16',
  amount: '2500',
  phone: '9999999999',
  buyer_name: 'John Doe',
  redirect_url: 'http://www.example.com/redirect/',
  send_email: false,
  webhook: 'http://www.example.com/webhook/',
  send_sms: false,
  email: 'foo@example.com',
  allow_repeated_payments: false}

request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
  if(!error && response.statusCode == 201){
    console.log(body);
  }
})

})






// ===================================================================== //


app.listen(8000, function() {
    console.log("listening to port 8000");
});
