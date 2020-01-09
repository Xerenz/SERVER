const Quiz = require("../models/quiz.model");
const ExhibitionEvent = require("../models/exhibitionEvent.model");

const nodemailer = require("nodemailer");




// show all

exports.quiz_re = function(req, res) {
    
    res.redirect("quiz/view")
};

exports.quiz_view = function(req, res) {
    
    res.render("quizRegister.ejs",{message1:"", message2:""})
};

exports.quiz_register = function(req, res) {
    
    quiz = new Quiz({

    	teamname : req.body.teamname,
        name1 : req.body.name1,
        email1 : req.body.email1,
        phone1 : req.body.phone1,
        college1 : req.body.college1,
        name2 : req.body.name2,
        email2 : req.body.email2,
        phone2 : req.body.phone2,
        college2 : req.body.college2,
    })

    quiz.save((err,data)=>{
    	if(err)
    	{
    		res.render("quizRegister",{message1:"Error", message2:"Team name or email already registered"})
    		console.log(err)
    	}
    	else
    	{
            // res.render("message",{message1:"Thank you for registering",message2:"We will contact you soon"})
            let smtpTransport = nodemailer.createTransport({
                service : 'Gmail',
                auth : {
                    user : 'tech.dhishna@gmail.com',
                    pass : 'SantyDance'
                }
            });

            let msg = {
                to : [req.body.email1, req.body.email2],
                from : 'tech.dhishna@gmail.com',
                subject : 'Inquisition - Confirmation',
                text : `Hey ${req.body.name1},
                
Thank you for registering to Inquisition!
You can complete your registration on the event day on 26th of January 2020 by paying Rs. 50. 
                
For further details or any clarification, contact: 
                
Hadi - 9747759956
Nihal - 8589895354
                
Regards,
Dhishna 2020`
            };

            smtpTransport.sendMail(msg, function(err) {
                if (err) res.render("message",{message1:"Thank you for registering",message2:"We were unable to send you an email, but your registration has been recorded."});  
                else res.render("message",{message1:"Thank you for registering",message2:"We have sent you a confirmation mail, please check your inbox"});
            });
            
    	}
    })

};

exports.exhibition_re = function(req, res) {
    
    res.redirect('exhibition/view')
};

exports.exhibition_view = function(req, res) {
    
    res.render("exhibitionRegister.ejs",{message1:"", message2:""})
};



exports.exhibition_register = function(req, res) {
    
    exhibition_ = new ExhibitionEvent({

        name1 : req.body.name1,
        email1 : req.body.email1,
        phone1 : req.body.phone1,
        college1 : req.body.college1,
       
    })

    exhibition_.save((err,data)=>{
        if(err)
        {
            res.render("exhibitionRegister",{message1:"Error", message2:"email already registered"})
            console.log(err)
        }
        else
        {
            let smtpTransport = nodemailer.createTransport({
                host : 'Gmail',
                auth : {
                    user : 'tech.dhishna@gmail.com',
                    pass : 'SantyDance'
                }
            });

            let msg = {
                to : req.body.email1,
                from : 'tech.dhishna@gmail.com',
                subject : 'Evento - Confirmation',
                text : `Hey ${req.body.name1},
                
Thank you for registering to Invento.
                
                `
            };

            smtpTransport.sendMail(msg, function(err) {
                if (err) res.render("message",{message1:"Thank you for registering",message2:"We were unable to send you an email, but your registration has been recorded."});  
                else res.render("message",{message1:"Thank you for registering",message2:"We have sent you a confirmation mail, please check your inbox"});
            });
            // res.render("message",{message1:"Thank you for registering",message2:"We will contact you soon"});
        }
    })

};


