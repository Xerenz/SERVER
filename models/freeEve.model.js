const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FreeEventSchema = new Schema(
    {
        name : {type: String, required: true, max: 100},
        date : {type: Date},
        branch : {type: String, required: true},
        content : {type: String},
        label : {type: String}
    }
);

module.exports = mongoose.model("FreeEvent", FreeEventSchema);