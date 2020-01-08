const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let quizRegister = new Schema(
    {
        teamname : {type: String, required: true, max: 100,unique: true},
        name1 : {type: String, required: true, max: 100},
        email1 : {type: String, required: true, max: 100,unique: true},
        phone1 : {type: String, required: true, max: 100},
        college1 : {type: String, required: true, max: 100},
        name2 : {type: String, required: true, max: 100},
        email2 : {type: String, required: true, max: 100,unique: true},
        phone2 : {type: String, required: true, max: 100},
        college2 : {type: String, required: true, max: 100}
        
    }
);

module.exports = mongoose.model("Quiz", quizRegister);