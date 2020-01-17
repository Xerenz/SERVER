
const fs = require("fs")



// place your data here


var data = JSON.parse(fs.readFileSync("pcb.json"))




    
    




var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost/dhishna');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    pcbSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

    var Pcb = mongoose.model('pcb_workshop', pcbSchema);

    Pcb.collection.drop();

    // save multiple documents to the collection referenced by  Model
    Pcb.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Ducati Workshop");
      }
    });
    
});
