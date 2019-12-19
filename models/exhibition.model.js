const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ExhibitionSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: Date, required: true},
        price : {type: String, required: false},
        branch : {type: String, required: false},
        content : {type: String}
    }
);

module.exports = mongoose.model("Exhibition", ExhibitionSchema);