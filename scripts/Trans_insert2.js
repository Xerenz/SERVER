const fs = require("fs")


// place your data here

var data = JSON.parse(fs.readFileSync("users.json"))


    
    




var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost/dhishna');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    AstroSchema = mongoose.Schema({

        username : {type: String, required: true, unique: true},
        password : {type: String},
        resetPasswordToken : {type: String},
        resetPasswordExpires : {type: Date},

      // personal info
        name : {type:String, max: 100},
        phone : {type: String},
        inst : {type: String},

        // registration info
        events : [{type: String, unique: true}],
        ws : [{type: String, unique: true}],

        // accommodation
        AccApplied : String,
        AccDate : [String]


    })

    var Astro = mongoose.model('users', AstroSchema);

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
