const Exhibition = require("../models/exhibition.model");

exports.exhibition_show = function(req, res) {
    res.render("exhibition");
};