const fs = require("fs")


// place your data here

var data = JSON.parse(fs.readFileSync("cloud.json"))


    
    




var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost/dhishna');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    ducatiSchema = mongoose.Schema({

        name : String,
        phone : String,
        email : String,
        event : String,
        payment_id : String,
        isAttended : {type : String, default : "false"},
        isSpot : {type : String, default : "false"},
        isWinner : {type : String, default : "false"},
        isSettled : {type : String, default : "false"}


    })

    var Ducati = mongoose.model('Main', ducatiSchema);

    Ducati.collection.drop();

    // save multiple documents to the collection referenced by  Model
    Ducati.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Main ");
      }
    });
    
});
