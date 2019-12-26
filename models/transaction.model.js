const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostTransactionSchema = new Schema(
    {
        payment_id : {type: String},
        payment_for : {type : String},
        status : {type: String},
        buyer : {type: String},
        uid : {type: Schema.Types.ObjectId, ref: "User"}
    }
);

const GetTransactionSchema = new Schema(
    {
        payment_id : {type: String},
        status : {type: String}
    }
);

exports.PostTransaction = mongoose.model("PostTransaction", PostTransactionSchema);

exports.GetTransaction = mongoose.model("GetTransaction", GetTransactionSchema);