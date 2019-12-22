
// place your data here

var data = [
    
    {
    	name : "Linear induction motor",
        label : "fun and games",
        branch : "EEE",
        content: "Hyperloop is a new transportation mode proposed by a Tesla and SpaceX. It is ais a system/network of sealed tubes through which a pod can travel. The"
    },
    {
    	name : "Decibel",
        label : "fun and games",
        branch : "EEE",
        content: "Hyperloop is a new transportation mode proposed by a Tesla and SpaceX. It is ais a system/network of sealed tubes through which a pod can travel. The"
    }
];



var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost/dhishna');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    var WorkshopSchema = mongoose.Schema({
      	name : {type: String, required: true},
        label : {type: String},
        branch : {type: String, required: true},
        content: {type: String}
    });
 
    // compile schema to model
    var Workshops = mongoose.model('workshop', WorkshopSchema);
 
    // documents array

    // save multiple documents to the collection referenced by Book Model
    Workshops.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
    
});