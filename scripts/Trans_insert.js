const fs = require("fs")


// place your data here

var data = JSON.parse(fs.readFileSync("transactions.json"))


    
    




var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost/dhishna');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    AstroSchema = mongoose.Schema({

        "payment_id":String,
        "payment_for": String,
        "status": String,
        "buyer": String,



    })

    var Astro = mongoose.model('Transaction', AstroSchema);

    Astro.collection.drop();

    // save multiple documents to the collection referenced by  Model
    Astro.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Astro Workshop");
      }
    });
    
});
