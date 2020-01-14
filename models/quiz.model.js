const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let quizRegister = new Schema(
    {
        teamname : {type: String, required: true, max: 100},
        name1 : {type: String, required: true, max: 100},
        email1 : {type: String, required: true, max: 100},
        phone1 : {type: String, required: true, max: 100},
        college1 : {type: String, required: true, max: 100},
        name2 : {type: String, required: true, max: 100},
        email2 : {type: String, required: true, max: 100},
        phone2 : {type: String, required: true, max: 100},
        college2 : {type: String, required: true, max: 100}
        
    }
);

quizRegister.plugin(uniqueValidator);



module.exports = mongoose.model("Quiz", quizRegister);