const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EventSchema = new Schema(
    {
        name : {type: String, required: true},
        label : {type: String},
        branch : {type: String, required: true},
        content: {type: String},
        label : {type: String},
        
        // payment url
        url : {type: String}
    }
);

module.exports = mongoose.model("Event", EventSchema);