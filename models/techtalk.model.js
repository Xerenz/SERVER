const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechTalkSchema = new Schema(
    {
        name : String,
        email : String,
        phone : String,
        payment_id : {type : String, unique : true},
        isSpot : {type : String, default : "false"},
        isAttended : {type : String, default : "false"}
    }
);

module.exports = mongoose.model("Techtalks", TechTalkSchema);