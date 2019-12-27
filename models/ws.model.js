const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let WorkshopSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: String},
        price : {type: String},
        branch : {type: String, required: true},
        content : {type: String},
        label : {type: String},
        contact:[
                    { 
                        name:String,
                        phone:String
                    }
                ],
        message:String,
        isOpen:Boolean,
        //full detail pdf name
        details:String,
        // payment url
        url : {type: String}
    }
);

module.exports = mongoose.model("Workshop", WorkshopSchema);