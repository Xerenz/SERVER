const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ExhibitionSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: Date},
        price : {type: String, required: false},
        branch : {type: String, required: false},
        content : {type: String},
        label : {type: String},
        
        // payment url
        url : {type: String}
    }
);

module.exports = mongoose.model("Exhibition", ExhibitionSchema);