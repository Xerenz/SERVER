const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GiveAwaySchema = new Schema(
    {
        payment_id : {type : String, unique: true},
        name : String,
        email : String,
        phone : String,
        institution : String,
        token : Number
    }
);

module.exports = mongoose.model("Giveaway", GiveAwaySchema);