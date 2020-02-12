const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Accomodation = new Schema(
    {
        name : String,
        email : String,
        phone : String,
        gender : String,
        payment_id : {type : String, unique : true}
    }
);

module.exports = mongoose.model("Accomodation", Accomodation);