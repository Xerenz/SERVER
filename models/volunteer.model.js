const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let volunteerSchema = new Schema ({
    name : {type : String},
    phone : {type : String},
    event : {type : String},
    branch : {type :String},
});

module.exports = mongoose.model('volunteer',volunteerSchema);