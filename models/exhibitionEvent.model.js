const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let exhibitionRegister = new Schema(
    {
       
        name1 : {type: String, required: true, max: 100},
        email1 : {type: String, required: true, max: 100,unique: true},
        phone1 : {type: String, required: true, max: 100},
        college1 : {type: String, required: true, max: 100},
       
        
    }
);

exhibitionRegister.plugin(uniqueValidator);



module.exports = mongoose.model("ExhibitionEvent", exhibitionRegister);