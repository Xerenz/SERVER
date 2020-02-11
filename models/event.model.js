const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EventSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: String},
        fees : {type: String},
        branch : {type: String, required: true},
        content : {type: String},
        price1:{type:String},
        price2:{type:String},
        price3:{type:String},
        label : {type: String},
        contact:[
                    { 
                        name:String,
                        phone:String
                    }
                ],
        message:String,
        isOpen:String,
        //full detail pdf name
        details:String,
        pdfUrl:String,
        // payment url
        url : {type: String},
        // link
        web_name : String
    }
);

module.exports = mongoose.model("Event", EventSchema);