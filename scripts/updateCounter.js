const mongoose = require("mongoose");

const counter = require("../models/counter.model");

mongoose.connect("mongodb://localhost/dhishna");

counter.updateOne({name : "counter"}, {"$set" : {"seq" : 10000}}, function(err) {
    if (err) return console.log(err);

    console.log("updated succesfully");
});