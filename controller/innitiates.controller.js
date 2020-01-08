const Quiz = require("../models/quiz.model");



// show all

exports.quiz_view = function(req, res) {
    
    res.render("quizRegister.ejs")
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
    		res.send("error in validating or already registered")
    		console.log(err)
    	}
    	else
    	{
    		res.send("sucessfully registered")
    	}
    })

};


