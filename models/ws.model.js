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
        pdfUrl:String,
        // payment url
        url : {type: String},
        // link 
        web_name : String,
        isWorkshop:Boolean
    }
);

module.exports = mongoose.model("Workshop", WorkshopSchema);