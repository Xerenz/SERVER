const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Accommodation = new Schema(
    {
        name : String,
        email : String,
        phone : String,
        gender : String,
        date : String,
        payment_id : {type : String, unique : true}
    }
);

module.exports = mongoose.model("Accommodation", Accommodation);