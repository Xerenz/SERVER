const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        payment_id : {type: String, unique : true},
        payment_for : {type : String},
        status : {type: String},
        buyer : {type: String},
        uid : {type: Schema.Types.ObjectId, ref: "User"}
    }
);

module.exports = mongoose.model("Transaction", TransactionSchema);