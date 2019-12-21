const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PaidEventSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: Date, required: true},
        price : {type: String, required: true},
        branch : {type: String, required: true},
        content : {type: String}
    }
);

module.exports = mongoose.model("PaidEvent", PaidEventSchema);