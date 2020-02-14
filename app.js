const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const qrcode = require("qrcode");
const promise = require('promise');
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const nodemailer = require("nodemailer");
const async = require("async");
const crypto = require("crypto");
// const flash = require("express-flash-messages");

// =========jithin doing experiment
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

// =================================

mongoose.connect("mongodb://localhost/dhishna");

// const userRoutes = require("./routes/user.route");
const eventRoutes = require("./routes/event.route");
const wsRoutes = require("./routes/ws.route");
const exhibitionRoutes = require("./routes/exhibition.route");
const adminRoutes = require("./routes/admin.route");
const volRoutes = require("./routes/volunteer.route");
const innitiatesRoutes = require("./routes/innitiates.route");
const spotlightRoutes = require("./routes/spotlight.route");
const accommodationRoutes = require("./routes/accommodation.route");
const managerRoutes = require("./routes/manager.route");



// to work on registration
// const Admin = require("./models/admin.model"); // not required now //

// User db
const User = require("./models/user.model");
// Transaction db
const Transaction = require("./models/transaction.model");


const app = express();

app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));

app.set("view engine", "ejs");

// Config all requirements
app.use(expressSession({
    secret: "You will see Santy Dance in Dhishna 2020",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// to work on registration

// for user
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==========================
// jithin doing some experiments

app.use(cookieParser('secret'));
app.use(expressSession({cookie: { maxAge: 60000 }}));
app.use(flash());

// ==========================



// config parent routes
app.use("/event", eventRoutes);
app.use("/events", eventRoutes);
app.use("/workshop", wsRoutes);
app.use("/workshops", wsRoutes);
app.use("/exhibition", exhibitionRoutes);
app.use("/SantyDance", adminRoutes);
app.use("/volunteer", volRoutes);
app.use("/initiates", innitiatesRoutes);
app.use("/spotlight", spotlightRoutes);
app.use("/accommodation",accommodationRoutes);
app.use("/manager", managerRoutes);



// ===================================== static ======================================= //


// to load static pages

app.get("/", function(req, res) {
    if(req.user)
    {
        res.render("home",{logStatus:true});
    }
    else
    {
        res.render("home",{logStatus:false})
    }
});

app.get("/home",function(req, res) {

    if(req.user)
    {
        res.render("home2",{logStatus:true});
    }
    else
    {
        res.render("home2",{logStatus:false})
    }
    
});


app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact", {message : ""});
});

app.get("/outreach", function(req, res) {
    res.render("outreach");
});

app.get("/giveaway",(req,res)=>{
    res.render("giveaway")
})



app.get("/sponsors",(req,res)=>{
    res.render("sponsors")
})


// ============================================================================= //


const Techtalk = require("./models/techtalk.model");


app.get("/techtalk",(req,res)=>{
    res.render("techtalk")
})


app.post("/techtalk/api", function(req, res) {
    let doc = new Techtalk({
        name : req.body.buyer_name,
        phone : req.body.buyer_phone,
        email : req.body.buyer,
        payment_id : req.body.payment_id
    });

    doc.save(function(err) {
        if (err) return console.log(err);

        smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : "tech.dhishna@gmail.com",
                pass : "SantyDance"
            }
        });

        let msg = {
            to : req.body.buyer,
            from : "Dhishna <tech.dhishna@gmail.com>",
            subject : "Tech Talks  |  Dhishna",
            text : `Hi,
            
This mail confirms your registration for Tech Talks Dhishna 2020 to be held on 19 February 2020. For any further information about the event please contact:

Basil : 8304897110
Aparna : 8921444192

Hoping to see you in more of our events on 20 and 21 February. Have a look at those events at https://dhishna.org

Cheers!
Dhishna 2020`
        };

        smtpTransport.sendMail(msg, function(err) {
            if (err) return console.log(err);

            console.log("Mail sent");

            res.sendStatus(200);
        });

    });
});



app.get("/techtalk/api", function(req, res) {
    if (req.params.status === "success")
    {
        res.redirect("/thankyou");
    }
    else {
        res.redirect("/techtalk");
    }
});



// ============================================================================ //

app.get("/message/error", function(req, res) {
    res.render("message", {message1 : "Oops there seems to be a problem!", message2: "This seems to be some technical error. Please contact us"});
});

app.get("/message/mail/error", function(req, res) {
    res.render("message", {message1 : "Oops!", message2 : "Seems like there was some problem in sending you mail. Your registration has been recorded but please make sure that you have provided us with a valid email. If you haven't please contact us."});
});

// -----------------------------------------------------

// handling contact info

app.post("/contact", function(req, res) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'tech.dhishna@gmail.com',
          pass: 'SantyDance'
        }
      });
      var mailOptions = {
        to: 'mail@dhishna.org',
        from: 'tech.dhishna@gmail.com',
        subject: req.body.email + ' Has an issue',
        text: 'Sender : ' + req.body.email + '\n' +
        'Name : ' + req.body.name + '\n' +
        'Issue : ' + req.body.content
      };
      smtpTransport.sendMail(mailOptions, function(err) {
          if (err) {
              console.log(err);
              res.render("contact", {message : "Oops! There seems to be some trouble in sending the message!"});
          }
        console.log('mail sent');
        res.render("contact",{message:"Your message has been sent to PR and Support, we'll get to you soon"});
      });
});

// thankyou page
app.get("/thankyou", function(req, res) {
    res.render("thankyou");
});


// ===================================== auth ======================================== //



app.get("/profile", isLoggedIn, function(req, res) {
    qrcode.toDataURL(req.user.phone, function(err, url) {
        if (err)
        {
            return console.log(err);
        }
        let user = {user_ : req.user, qr : url};
        res.render("user/profile", {user : user});
    });
});

// Register

app.get("/register", function(req, res) {
    res.render("user/register",{"error":req.flash('message')});
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
            req.flash('message',err.message)
            return res.redirect('/register');
        }
        console.log("user created " + user.username);
        passport.authenticate("local")(req, res, function() {
            if (req.user) {
                console.log("user authenticated");
                res.redirect("/workshop");
            }
        });
    });
});



// Login

app.get("/login", function(req, res) {
    var message = "LogIn Here!"
    // if (req.user)
        // message = "LogIn with another account?";
    res.render("user/login", {message : req.flash('error')});
});


app.post("/login", passport.authenticate("local", {

    failureRedirect: "/login",
    failureFlash: true
}), function(req, res) {
    // final handler
      User.findById(req.user._id);
      var redirectionUrl = req.session.redirectUrl || '/home';
      res.redirect(redirectionUrl);
});

// logout

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});


// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/workshop" ,
//     failureRedirect: "/login",
//     failureFlash: true
// }), function(req, res) {
//     // final handler
// });




// middleware for checking user auth
function isLoggedIn(req, res, next) {
    console.log("checking login state");
    if (!req.isAuthenticated() || !req.isAuthenticated) {  
        if (req.session) {  
            req.session.redirectUrl = req.headers.referer || req.originalUrl || req.url;  
        }  
        console.log("ivde ethii") 
        // next(); 
        res.redirect('/login');
    } else {
        next();  
    }  
}


// function isLoggedIn(req, res, next) {
//     console.log("checking login state");
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

// =============================

app.get('/workshop/:id/login',isLoggedIn,(req,res)=>{
  var id = req.params.id;
  res.redirect('/workshop/'+id+'/knowmore')
})

app.get('/event/:id/login',isLoggedIn,(req,res)=>{
  var id = req.params.id;
  res.redirect('/event/'+id+'/knowmore')
})

// =============================
// forgot password
app.get("/forgot", function(req, res) {
    res.render("user/forgot",{message:req.flash('error')});
})

app.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
          console.log("first function fired");
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        console.log("second function fired");
        User.findOne({ username: req.body.email }, function(err, user) {
            if (err) console.log("second was the error");
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
          console.log(token);
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        console.log("third function fired");
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'tech.dhishna@gmail.com',
            pass: 'SantyDance'
          }
        });
        var mailOptions = {
          to: user.username,
          from: 'tech.dhishna@gmail.com',
          subject: 'Dhishna2020 Password Reset',
          text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          res.render("user/forgot",{message:"A Password reset link has been sent to your email"});
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
});
  
app.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            console.log('error', 'Password reset link is invalid or has expired.');
            req.flash('error', 'Password reset link is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('user/reset', {token: req.params.token});
    });
});

app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'tech.dhishna@gmail.com',
            pass: 'SantyDance'
          }
        });
        var mailOptions = {
          to: user.username,
          from: 'tech.dhishna@mail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
});
    


// ======================================================================================== //
// =============================================== Give Away ============================== //
// ======================================================================================== //


const Giveaway = require("./models/giveaways.model");
const Counter = require("./models/counter.model");



app.post("/api/giveaway", function(req, res) {
    async.waterfall([
        function(done) {

            let quantity = req.body.quantity;
            // 5e256c16420b76188cc42ac9 - real id
            Counter.findByIdAndUpdate("5e256c16420b76188cc42ac9", 
            {"$inc" : {"seq" : quantity}}, function(err, counter) {
                if (err)
                { 
                    return res.render("message", {message1 : "Opps! There seems to be some technical error", message2 : "Please contact us."});
                }

                let tokens = [];
                let tokenNum = counter.seq;

                for (let i = 1; i <= quantity; i++)
                {
                    tokenNum += 1;
                    tokens.push(tokenNum);
                }

                let doc = Giveaway({
                    payment_id : req.body.payment_id,
                    name : req.body.buyer_name,
                    email : req.body.buyer,
                    phone : req.body.buyer_phone,
                    token : tokens,
                    quantity : quantity
                });
    
                doc.save(function(err) {
                    if (err) 
                    {
                        return res.render("message", {message1 : "Opps! There seems to be some technical error", message2 : "Please contact us."});
                    }
                    console.log("new doc saved");
                    done(err, quantity);
                });

            });
        },
        function(done) {
            Giveaway.findOne({payment_id : req.body.payment_id}, function(err, doc) {
                if (err)
                { 
                    return res.render("message", {message1 : "Oops! There seems to an error sending you the email with your coupon code.", message2 : "Please contact us."});
                }    

                console.log(doc);

                let userTokens = doc.token.join(", ");

                smtpTransport = nodemailer.createTransport({
                    service : "Gmail",
                    auth : {
                        user : "tech.dhishna@gmail.com",
                        pass : "SantyDance"
                    }
                });

                let msg = {
                    to : doc.email,
                    from : "Dhishna <mail@dhishna.org>",
                    subject : "Dhishna 2020 Giveaway",
                    html : `<html>
<body>
<p>Hey ${doc.name},</p>
                    
<p>Thank you for participating in the Dhishna 2020 Giveaway contest!</p>

<p>Your lucky draw token(s) <b>${userTokens}</b></p>

<p>We will be announcing the results shortly, so stay tuned.</p>

<br>
<br>
<br>
<p>General Guidelines:</p> 

<p>1. With each coupon purchase, you will be getting a 15% discount voucher from Al-Baik, Kalamassery.</p>
<p>2. The contest is being conducted on both online and offline platforms, with participants on both platforms having a common lucky draw.</p>
<p>3. If our representative can not get in touch with the winner, then re-drawing will be taken into account.</p>

<br>

<p>Cheers!</p>
<p>Dhishna 2020</p>
</body>
</html>`,
                    attachments : [
                        {
                            filename : 'coupon_.jpg',
                            path : './assets/img/give_away_coupon.jpg'
                        },
                        {
                            filename : '_coupon.jpg',
                            path : './assets/img/give_away_coupon_.jpg'
                        }
                    ]
                };

                smtpTransport.sendMail(msg, function(err) {
                    if (err) done(err);
                    else console.log("Mail Sent to", doc.name);
                });

            });
        },
        function(done) {
            res.sendStatus(200);
            done(err);
        }
    ], function(err) {
        if (err)
        { 
            return res.render("message", {message1 : "Oops! There seems to an error sending you the email with your coupon code.", message2 : "Please contact us."});
        }
    });
});


app.get("/api/giveaway", function(req, res) {
    res.redirect("/thankyou");
});



app.post("/api/valentine", function(req, res) {
    async.waterfall([
        function(done) {

            let quantity = req.body.quantity;
            // 5e256c16420b76188cc42ac9 - real id
            Counter.findByIdAndUpdate("5e3a5493f4415c6782812803", 
            {"$inc" : {"seq" : quantity}}, function(err, counter) {
                if (err)
                { 
                    return console.log(err);
                }

                let tokens = [];
                let tokenNum = counter.seq;

                for (let i = 1; i <= quantity; i++)
                {
                    tokenNum += 1;
                    tokens.push(tokenNum);
                }

                let doc = Giveaway({
                    payment_id : req.body.payment_id,
                    name : req.body.buyer_name,
                    email : req.body.buyer,
                    phone : req.body.buyer_phone,
                    token : tokens,
                    quantity : quantity
                });
    
                doc.save(function(err) {
                    if (err) 
                    {
                        return console.log(err);
                    }
                    console.log("new doc saved");
                    done(err, quantity);
                });

            });
        },
        function(done) {
            Giveaway.findOne({payment_id : req.body.payment_id}, function(err, doc) {
                if (err)
                { 
                    return console.log(err);
                }    

                console.log(doc);

                let userTokens = doc.token.join(", ");

                smtpTransport = nodemailer.createTransport({
                    service : "Gmail",
                    auth : {
                        user : "tech.dhishna@gmail.com",
                        pass : "SantyDance"
                    }
                });

                let msg = {
                    to : doc.email,
                    from : "Dhishna <mail@dhishna.org>",
                    subject : "Dhishna 2020 Giveaway",
                    html : `<html>
<body>
<p>Hey ${doc.name},</p>
                    
<p>Thank you for participating in the Dhishna 2020 Giveaway Valentine contest!</p>

<p>Your lucky draw token(s) <b>${userTokens}</b></p>

<p>We will be announcing the results shortly, so stay tuned. You might win a chance for winning a ticket to munnar this valentine</p>

<br>
<p>Cheers!</p>
<p>Dhishna 2020</p>
</html>`,
                    attachments : [
                        {
                            filename : 'coupon_.jpg',
                            path : './assets/img/give_away_coupon.jpg'
                        },
                        {
                            filename : '_coupon.jpg',
                            path : './assets/img/give_away_coupon_.jpg'
                        }
                    ]
                };

                smtpTransport.sendMail(msg, function(err) {
                    if (err) done(err);
                    else console.log("Mail Sent to", doc.name);
                });

            });
        },
        function(done) {
            res.sendStatus(200);
            done(err);
        }
    ], function(err) {
        if (err)
        { 
            return console.log(err);
        }
    });
});


app.get("/api/valentine", function(req, res) {
    res.redirect("/thankyou");
});



// ======================================================================================= //






Innova = require("./models/innova.model");

// webhook handler for innovator summit
app.post("/api_innova", function(req, res) {
    if (req.body.status === 'Credit') {

        console.log("sucessfull payment by ", req.body.buyer);

        // add to innovator 
        let payment = Innova({
            name : req.body.buyer,
            payment_id : req.body.payment_id
        });

        payment.save(function(err) {
            if (err)
                console.log(err)
            else 
                console.log("payment saved");
        });
    }

    else 
        console.log("failed payment");
});



// ===================================================================== //

// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************

// code for handle 

// =====================================================





// =====================================================


// =====================================================
//         CYBER WORKSHOP
// =====================================================


cyberSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Cyber = mongoose.model('cyber_workshop', cyberSchema);


app.get('/',(req,res) =>{
  res.send("admin dash is running in another port");
})

app.get('/handle/cyber/view',(req,res)=>{

  Cyber.find({}).then((data)=>{
        res.render("Attendee/attend_view.ejs",{data:data})
    })

})


app.get('/handle/cyber/:id/change',(req,res)=>{

    Cyber.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/cyber/view')
            }
        })


    })

})



app.get('/handle/cyber/scan',(req,res)=>{
    res.render("Attendee/Cyber.ejs",{message:""})
})


app.get('/handle/cyber/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Cyber.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Cyber.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/cyber/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/Cyber',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/cyber/new',(req,res)=>{
    res.render("Attendee/newCyber")
})


app.post('/handle/cyber/new',(req,res)=>{

   

    cyber = new Cyber({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    cyber.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/cyber/new')
        }
        else
        {
            res.redirect('/handle/cyber/view')
        }
    })
})


// ++++++++++++++++++++++++++++++++++++++++++++++++
//              HUMANOID WORKSHOP
// ++++++++++++++++++++++++++++++++++++++++++++++++




humanSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Human = mongoose.model('human_workshop', humanSchema);



app.get('/handle/human/view',(req,res)=>{

  Human.find({}).then((data)=>{
        res.render("Attendee/attend_view2.ejs",{data:data})
    })

})

// ++

app.get('/handle/human/:id/change',(req,res)=>{

    Human.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/human/view')
            }
        })


    })

})

// ++
app.get('/handle/human/scan',(req,res)=>{
    res.render("Attendee/Human.ejs",{message:""})
})


// ++


app.get('/handle/human/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Human.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Human.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/human/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/Human',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/human/new',(req,res)=>{
    res.render("Attendee/newHuman")
})


app.post('/handle/human/new',(req,res)=>{

   

    human = new Human({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    human.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/human/new')
        }
        else
        {
            res.redirect('/handle/human/view')
        }
    })
})


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                DUCATI WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ducatiSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Ducati = mongoose.model('ducati_workshop', ducatiSchema);



app.get('/handle/ducati/view',(req,res)=>{

  Ducati.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_ducati.ejs",{data:data})
    })

})


app.get('/handle/ducati/present',(req,res)=>{

  Ducati.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_ducati.ejs",{data:data})
    })

})


app.get('/handle/ducati/:id/change',(req,res)=>{

    Ducati.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/ducati/view')
            }
        })


    })

})



app.get('/handle/ducati/scan',(req,res)=>{
    res.render("Attendee/Ducati.ejs",{message:""})
})


app.get('/handle/ducati/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Ducati.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Ducati.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/ducati/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/Ducati',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/ducati/new',(req,res)=>{
    res.render("Attendee/newDucati")
})


app.post('/handle/ducati/new',(req,res)=>{

   

    ducati = new Ducati({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    ducati.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/ducati/new')
        }
        else
        {
            res.redirect('/handle/ducati/view')
        }
    })
})





// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                PCB WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

pcbSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Pcb = mongoose.model('pcb_workshop', pcbSchema);



app.get('/handle/pcb/view',(req,res)=>{

  Pcb.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_pcb.ejs",{data:data})
    })

})


app.get('/handle/pcb/present',(req,res)=>{

  Pcb.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_pcb.ejs",{data:data})
    })

})


app.get('/handle/pcb/:id/change',(req,res)=>{

    Pcb.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/pcb/view')
            }
        })


    })

})



app.get('/handle/pcb/scan',(req,res)=>{
    res.render("Attendee/Pcb.ejs",{message:""})
})


app.get('/handle/pcb/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Pcb.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Pcb.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/pcb/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/Pcb',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/pcb/new',(req,res)=>{
    res.render("Attendee/newPcb")
})


app.post('/handle/pcb/new',(req,res)=>{

   

    pcb = new Pcb({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    pcb.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/pcb/new')
        }
        else
        {
            res.redirect('/handle/pcb/view')
        }
    })
})





// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                Mercides WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

merciSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Merci = mongoose.model('merci_workshop', merciSchema);



app.get('/handle/merci/view',(req,res)=>{

  Merci.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_merci.ejs",{data:data})
    })

})


app.get('/handle/merci/present',(req,res)=>{

  Merci.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_merci.ejs",{data:data})
    })

})


app.get('/handle/merci/:id/change',(req,res)=>{

    Merci.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/merci/view')
            }
        })


    })

})



app.get('/handle/merci/scan',(req,res)=>{
    res.render("Attendee/Merci.ejs",{message:""})
})


app.get('/handle/merci/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Merci.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Merci.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/merci/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/Merci',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/merci/new',(req,res)=>{
    res.render("Attendee/newMerci")
})


app.post('/handle/merci/new',(req,res)=>{

   

    merci = new Merci({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    merci.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/merci/new')
        }
        else
        {
            res.redirect('/handle/merci/view')
        }
    })
})





// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                Fire and safety WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

fireSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Fire = mongoose.model('fire_workshop', merciSchema);



app.get('/handle/fire/view',(req,res)=>{

  Fire.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_fire.ejs",{data:data})
    })

})


app.get('/handle/fire/present',(req,res)=>{

  Fire.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_fire.ejs",{data:data})
    })

})


app.get('/handle/fire/:id/change',(req,res)=>{

    Fire.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/fire/view')
            }
        })


    })

})



app.get('/handle/fire/scan',(req,res)=>{
    res.render("Attendee/Fire.ejs",{message:""})
})


app.get('/handle/fire/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Fire.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Fire.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/fire/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/Fire',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/fire/new',(req,res)=>{
    res.render("Attendee/newFire")
})


app.post('/handle/fire/new',(req,res)=>{

   

    fire = new Fire({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    fire.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/fire/new')
        }
        else
        {
            res.redirect('/handle/fire/view')
        }
    })
})







// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                INNOVATORS SUMMIT
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

innovSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": {type:String, default: "false"},
        "isSpot": {type:String,default: "false"},
        "topic":String


    })

var Innov = mongoose.model('innov', innovSchema);



app.get('/handle/innov/view',(req,res)=>{

  Innov.find({}).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})


app.get('/handle/innov/student_1',(req,res)=>{

  Innov.find({ "topic": "Innovator's Summit Ticket - Track-1 - Student"}).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})


app.get('/handle/innov/student_2',(req,res)=>{

  Innov.find({"topic": "Innovator Summit Ticket - Track-2 - Student"}).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})

app.get('/handle/innov/pro_1',(req,res)=>{

  Innov.find({ "topic": "Innovator's Summit Ticket - Track-1 - Professional"}).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})


app.get('/handle/innov/pro_2',(req,res)=>{

  Innov.find({ "topic": "Innovator Summit Ticket - Track-2 - Professional"}).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})


app.get('/handle/innov/season_p',(req,res)=>{

  Innov.find({ "topic": "Professional - Session Ticket"}).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})

app.get('/handle/innov/season_s',(req,res)=>{

  Innov.find({  "topic": "Student - Session Ticket" }).sort({name:1}).then((data)=>{

        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})



app.get('/handle/innov/present',(req,res)=>{

  Innov.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_innov.ejs",{data:data})
    })

})


app.get('/handle/innov/:id/change',(req,res)=>{

    Innov.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/innov/view')
            }
        })


    })

})



app.get('/handle/innov/scan',(req,res)=>{
    res.render("Attendee/innov.ejs",{message:""})
})


app.get('/handle/innov/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Pcb.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/innov.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/innov/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/innov',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/innov/new',(req,res)=>{
    res.render("Attendee/newInnov")
})


app.post('/handle/innov/new',(req,res)=>{

   

    innov = new Innov({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    innov.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/innov/new')
        }
        else
        {
            res.redirect('/handle/innov/view')
        }
    })
})





// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                Automobile 360 WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AutoSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var auto = mongoose.model('auto_workshop', AutoSchema);



app.get('/handle/auto/view',(req,res)=>{

  auto.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_auto.ejs",{data:data})
    })

})


app.get('/handle/auto/present',(req,res)=>{

  auto.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_auto.ejs",{data:data})
    })

})


app.get('/handle/auto/:id/change',(req,res)=>{

    auto.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/auto/view')
            }
        })


    })

})



app.get('/handle/auto/scan',(req,res)=>{
    res.render("Attendee/Auto.ejs",{message:""})
})


app.get('/handle/auto/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    auto.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Auto.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/auto/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/auto',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/auto/new',(req,res)=>{
    res.render("Attendee/newAuto")
})


app.post('/handle/auto/new',(req,res)=>{

   

    Auto = new auto({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    Auto.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/auto/new')
        }
        else
        {
            res.redirect('/handle/auto/view')
        }
    })
})





// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                Astro WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AstroSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var astro = mongoose.model('astro_workshop', AstroSchema);



app.get('/handle/astro/view',(req,res)=>{

  astro.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_astro.ejs",{data:data})
    })

})


app.get('/handle/astro/present',(req,res)=>{

  astro.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_astro.ejs",{data:data})
    })

})


app.get('/handle/astro/:id/change',(req,res)=>{

    astro.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/astro/view')
            }
        })


    })

})



app.get('/handle/astro/scan',(req,res)=>{
    res.render("Attendee/Astro.ejs",{message:""})
})


app.get('/handle/astro/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    astro.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/Astro.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/astro/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/astro',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/astro/new',(req,res)=>{
    res.render("Attendee/newAstro")
})


app.post('/handle/astro/new',(req,res)=>{

   

    Astro = new astro({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    Astro.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/astro/new')
        }
        else
        {
            res.redirect('/handle/astro/view')
        }
    })
})





// **************************************************************************


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//               Forensics WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ForensicsSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var forensics = mongoose.model('Cyber_Forensics_workshop', ForensicsSchema);



app.get('/handle/forensics/view',(req,res)=>{

  forensics.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_forensics.ejs",{data:data})
    })

})


app.get('/handle/forensics/present',(req,res)=>{

  forensics.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_forensics.ejs",{data:data})
    })

})


app.get('/handle/forensics/:id/change',(req,res)=>{

    forensics.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/forensics/view')
            }
        })


    })

})



app.get('/handle/forensics/scan',(req,res)=>{
    res.render("Attendee/forensics.ejs",{message:""})
})


app.get('/handle/forensics/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    forensics.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/forensics.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/forensics/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/forensics',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/forensics/new',(req,res)=>{
    res.render("Attendee/newforensics")
})


app.post('/handle/forensics/new',(req,res)=>{

   

    Forensics = new forensics({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    Forensics.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/forensics/new')
        }
        else
        {
            res.redirect('/handle/forensics/view')
        }
    })
})





// **************************************************************************


// **************************************************************************


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//               Tezlaa WORKSHOP
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

TezlaaSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var tezlaa = mongoose.model('Tezlaa_workshop', TezlaaSchema);



app.get('/handle/tezlaa/view',(req,res)=>{

  tezlaa.find({}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_tezlaa.ejs",{data:data})
    })

})


app.get('/handle/tezlaa/present',(req,res)=>{

  tezlaa.find({isAttended:"true"}).sort({name:1}).then((data)=>{
        res.render("Attendee/attend_view_tezlaa.ejs",{data:data})
    })

})


app.get('/handle/tezlaa/:id/change',(req,res)=>{

    tezlaa.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/tezlaa/view')
            }
        })


    })

})



app.get('/handle/tezlaa/scan',(req,res)=>{
    res.render("Attendee/tezlaa.ejs",{message:""})
})


app.get('/handle/tezlaa/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    tezlaa.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('Attendee/tezlaa.ejs',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/tezlaa/view')
                }
            }) 
        }
        else
        {
            res.render('Attendee/tezlaa',{message:"Person not found"})
        }
        
    })


})


app.get('/handle/tezlaa/new',(req,res)=>{
    res.render("Attendee/newtezlaa")
})


app.post('/handle/tezlaa/new',(req,res)=>{

   

    Tezlaa = new tezlaa({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    Tezlaa.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/tezlaa/new')
        }
        else
        {
            res.redirect('/handle/tezlaa/view')
        }
    })
})





// **************************************************************************



// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************




app.get('*' ,(req,res)=>{

    res.render("404");

});


PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
    console.log("listening to port", PORT);

    console.log(process.env.SUPPORT);
});


// ============================== with love from tech team Dhishna 2020 ===================================== //

