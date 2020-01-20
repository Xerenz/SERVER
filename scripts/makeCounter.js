const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dhishna");

const Counter = require("../models/counter.model");

let counter = new Counter({
    name : "counter",
    seq : 1000
});

counter.save(function(err) {
    if (err) return console.log(err);

    console.log("counter created");
});