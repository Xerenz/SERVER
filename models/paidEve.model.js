const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PaidEventSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: Date},
        price : {type: String},
        branch : {type: String, required: true},
        content : {type: String}
    }
);

module.exports = mongoose.model("PaidEvent", PaidEventSchema);