const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema(
    {
        name : {type:String, require: true, max: 100},
        password : {type: String, require: true},
        phone : {type: String, require: true},
        email : {type: String, require: true},
        events : [{type: Schema.Types.ObjectId, ref: "PaidEvent"}],
        ws : [{type: Schema.Types.ObjectId, ref: "Workshop"}]
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);