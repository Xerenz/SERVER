const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema(
    {
    	// auth info
    	username : {type: String},
    	password : {type: String},

    	// personal info
        name : {type:String, max: 100},
        phone : {type: String},
        inst : {type: String},

        // registration info
        events : [{type: Schema.Types.ObjectId, ref: "Event"}],
        ws : [{type: Schema.Types.ObjectId, ref: "Workshop"}]
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);