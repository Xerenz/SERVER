const fs = require("fs")


// place your data here

var data = JSON.parse(fs.readFileSync("Automobile_360.json"))


    
    




var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost/dhishna');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    AutoSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

    var Auto360 = mongoose.model('auto_workshop', AutoSchema);

    Auto360.collection.drop();

    // save multiple documents to the collection referenced by  Model
    Auto360.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Auto360 Workshop");
      }
    });
    
});
