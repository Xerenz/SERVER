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
        events : [{type: String, unique: true}],
        ws : [{type: String, unique: true}],

        // accommodation
        AccApplied : String,
        AccDate : String
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);