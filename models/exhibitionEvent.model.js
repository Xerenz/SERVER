const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let exhibitionRegister = new Schema(
    {
       
        name1 : {type: String, required: true, max: 100},
        email1 : {type: String, required: true, max: 100,unique: true},
        phone1 : {type: String, required: true, max: 100},
        college1 : {type: String, required: true, max: 100},
        name2 : {type: String, required: true, max: 100},
        email2 : {type: String, required: true, max: 100,unique: true},
        phone2 : {type: String, required: true, max: 100},
        college2 : {type: String, required: true, max: 100},
        name3 : {type: String,  max: 100},
        email3 : {type: String,  max: 100},
        phone3 : {type: String,  max: 100},
        college3 : {type: String,  max: 100},
        name4 : {type: String,  max: 100},
        email4 : {type: String,  max: 100},
        phone4 : {type: String,  max: 100},
        college4 : {type: String,  max: 100},
        work_mdl:{type:String},
        still_mdl:{type:String},
        paper_present:{type:String}

       
        
    }
);

exhibitionRegister.plugin(uniqueValidator);



module.exports = mongoose.model("ExhibitionEvent", exhibitionRegister);