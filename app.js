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
// const registrationRoutes = require("./routes/registration.routes");





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
app.use("/workshop", wsRoutes);
app.use("/exhibition", exhibitionRoutes);
app.use("/SantyDance", adminRoutes);
app.use("/volunteer", volRoutes);
app.use("/initiates", innitiatesRoutes);



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
    qrcode.toDataURL(req.user.id, function(err, url) {
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
    successRedirect: "/workshop" ,
    failureRedirect: "/login",
    failureFlash: true
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
  
  
//<a href="https://test.instamojo.com/dhishna2020/workshop-3/" rel="im-checkout" data-text="Pay" data-css-style="color:#ffffff; background:#75c26a; width:300px; border-radius:4px"   data-layout="vertical"></a>
//<script src="https://js.instamojo.com/v1/button.js"></script>

// ============================================== payments ===================================== //


// pay button was clicked
/*
app.get("/payment", function(req, res) {
    if (req.user) {
        name = req.user.name;
        email = req.user.username;
        phone = req.user.phone;

        // string manipulation

        qstring = "?data_name=" + name + "&data_email=" + email + "&data_phone=" + phone;
        qinstruc = "&data_readonly=data_name&data_readonly=data_email&data_readonly=data_phone";
        return res.redirect("https://test.instamojo.com/dhishna2020/workshop-3/" + qstring + qinstruc); // instamojo
    }
    res.redirect("/login"); // unauthorized user
});

// webhook
app.post("/api", function(req, res) {
    // console.log(req);

    if (req.body.status === 'Credit') {
    
       let payment = new Transaction({
            payment_id : req.body.payment_id,
            status : req.body.status,
            payment_for : req.body.offer_title,
            buyer : req.body.buyer
        }); 

        console.log("Transaction was credit");



        User.updateOne({username : req.body.buyer},
            {"$push" : {"events" : req.body.offer_title}},
                function(err, user) {
            if (err)
                console.log(err);
            else {
                console.log("event added to user..");   
            } 

        }); 

        console.log(req.user);

        payment.save(function(err) {
            if (err)
                console.log(err);
            else {
                console.log("payment saved", req.body.payment_id, 
                req.body.offer_title);
            }
        }); 
    }

    else {
        console.log("transaction failed");
    }
});


// redirect after success
app.get("/api", function(req, res) {
    console.log(req.query);
    if (req.query.status === 'success') {

        Transaction.find({payment_id : req.query.payment_id}, function(err, doc) {
            if (err)
                console.log(err);
            if (doc.length === 0) {
                console.log("Not saved via webhook..");

                let url = "https://test.instamojo.com/api/1.1/payment-requests/"
                let payload = {}
                let headers = {'X-Api-Key': 'test_33e8cff1c7771aa97518b6bbf70', 'X-Auth-Token': 'test_a2981cf2689df276c8dc7d732d7'};

                // console.log(req.payment_request.id);


                // need main payment id of format : d66cb29dd059482e8072999f995c4eef
                // payment_id is of format : MOJO5a06005J21512197
                request.get(url + req.query.payment_id, 
                {form : payload, headers : headers},
                function(err, res, body) {

                    if (err)
                        console.log(err);

                    console.log(body);

                    let payment = new Transaction({
                        payment_id : req.query.payment_id,
                        status : req.query.status,
                    });

                    console.log(req.user);

                    User.updateOne({id : req.user.id},
                        {"$push" : {"events" : "An Event through get req"}},
                         function(err, user) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("Event added for user");
                            console.log(user); // check user state
                        }
                    });
                
                    payment.save(function(err) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("payment saved", req.body.payment_id, 
                            req.body.offer_title);
                        }
                    }); 
                });
            }
            // check if payment saved via webhook //
            else {
                console.log("payment saved by webhook...");
            }

            res.redirect("/");
        });
    }
    // check if transaction was a success //
    else {
        console.log("failed transaction...");
    }

    
});

*/


// ======================================================================================== //



const Giveaway = require("./models/giveaways.model");
const Counter = require("./models/counter.model");



app.post("/api/giveaway", function(req, res) {
    async.waterfall([
        function(done) {

            Counter.findByIdAndUpdate("5e256c16420b76188cc42ac9", 
            {"$inc" : {"seq" : 1}}, function(err, counter) {
                if (err) return console.log(err); // return res.render("message", "Opps! There seems to be some technical error", "Please contact us.");
                
                let doc = Giveaway({
                    payment_id : req.body.payment_id,
                    name : req.body.buyer_name,
                    email : req.body.buyer,
                    phone : req.body.buyer_phone,
                    token : counter.seq
                });
    
                doc.save(function(err) {
                    if (err) return console.log(err); //return res.render("message", "Opps! There seems to be some technical error", "Please contact us.");
                    console.log("new doc saved");
                    done(err);
                });

            });
        },
        function(done) {
            Giveaway.findOne({payment_id : req.body.payment_id}, function(err, doc) {
                if (err) console.log(err); // return res.render("message", "Opps! There seems to be some technical error", "Please contact us.");
                console.log(doc);

                smtpTransport = nodemailer.createTransport({
                    service : "Gmail",
                    auth : {
                        user : "tech.dhishna@gmail.com",
                        pass : "SantyDance"
                    }
                });

                let msg = {
                    to : doc.email,
                    from : "Dhishna <tech.dhishna@gmail.com>",
                    subject : "Dhishna 2020 Giveaway",
                    html : `<html>
<body>
<p>Hey ${doc.name},</p>
                    
<p>Thank you for participating in the Dhishna 2020 Giveaway contest!</p>

<p>Your token is <b>D${doc.token}</b></p>

<p>We will be announcing the results shortly, so stay tuned.</p>
</body>
</html>`
                };

                smtpTransport.sendMail(msg, function(err) {
                    if (err) done(err);
                    else console.log("Mail Sent to", doc.name);
                });

            });
        }
    ], function(err) {
        if (err) return console.log(err); // return res.render("message", "Opps! We were not able to send you the mail, but your entry has been recorded.", "Please contact us.");
    });
});


app.get("/api/giveaway", function(req, res) {
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
//                INNOVATORS SUMMIT
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

innovSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": {type:String, default: "false"},
        "isSpot": {type:String,default: "false"}


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

