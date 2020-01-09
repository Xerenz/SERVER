const Quiz = require("../models/quiz.model");
const ExhibitionEvent = require("../models/exhibitionEvent.model");




// show all

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
    		res.render("message",{message1:"Thank you for registering",message2:"We will contact you soon"})
    	}
    })

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
            res.render("message",{message1:"Thank you for registering",message2:"We will contact you soon"})
        }
    })

};


