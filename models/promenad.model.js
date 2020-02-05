const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Promenad = new Schema(
    {
        name : String,
        phone : String,
      	email : String,
        college : String,
        isSpot : {type : String, default : "false"},
        isAttended : {type : String, default : "false"}
    }
);

module.exports = mongoose.model("Promenad", Promenad);