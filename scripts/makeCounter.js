const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dhishna");

const Counter = require("../models/counter.model");

let counter = new Counter({
    name : "valentine",
    seq : 20000
});

counter.save(function(err) {
    if (err) return console.log(err);

    console.log("counter created");
});