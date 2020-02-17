const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainSchema = new Schema(
    {
        name : String,
        phone : String,
        email : String,
        event : String,
        inst : String,
        payment_id : String,
        isAttended : {type : String, default : "false"},
        isSpot : {type : String, default : "false"},
        isWinner : {type : String, default : "false"},
        isSettled : {type : String, default : "false"},
        rank : String
    }
);

module.exports = mongoose.model("Main", MainSchema);