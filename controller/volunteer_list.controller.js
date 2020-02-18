const volunteer = require('../models/volunteer.model');

exports.data_show =  (req,res) => {
                volunteer.find ((err,data) => {
                    if(err) console.log("Error");
                    else {
                    console.log(data);
                    res.render('volunteer_list',{data:data});
                    }
                
                });
            }
