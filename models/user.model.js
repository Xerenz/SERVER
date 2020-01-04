const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema(
    {
    	// auth info
    	username : {type: String, required: true, unique: true},
        password : {type: String},
        resetPasswordToken : {type: String},
        resetPasswordExpires : {type: Date},

    	// personal info
        name : {type:String, max: 100},
        phone : {type: String},
        inst : {type: String},

        // registration info
        events : [{type: Schema.Types.ObjectId, ref: "Event", unique: true}],
        ws : [{type: Schema.Types.ObjectId, ref: "Workshop", unique: true}]
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);