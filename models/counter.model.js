const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterSchema = new Schema(
    {
        name : {type : String, default : "Counter"},
        seq : {type : Number, default : 0}
    }
);

module.exports = mongoose.model("Counter", CounterSchema);