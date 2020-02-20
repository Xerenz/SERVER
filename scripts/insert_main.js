const fs = require("fs");
const mongoose = require("mongoose");

const Main = require("../models/main.model");
const Volunteer = require("../models/volunteer.model");

mongoose.connect('mongodb://localhost/dhishna');

let data = JSON.parse(fs.readFileSync('transactions.json'));


Main.collection.insert(data, function (err, docs) {
	if (err) {
		return console.log(err);
	}

	console.log("multiple files inserted");
});

let voldata = JSON.parse(fs.readFileSync('eve_vol.json'));

Volunteer.collection.insert(voldata, function (err, docs) {
	if (err) {
		return console.log(err);
	}

	console.log("vol files inserted");
});
