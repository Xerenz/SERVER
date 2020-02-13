const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hospitality = new Schema(
    {
        name : String,
        email : String,
        phone : String,
        gender : String,
        date : String,
        quantity : String,
        ticket : String,
        payment_id : {type : String, unique : true}
    }
);

module.exports = mongoose.model("Hospitality", Hospitality);