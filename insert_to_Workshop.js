const Workshop = require("./models/ws.model");


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

    // documents array

    // save multiple documents to the collection referenced by Book Model
    Workshop.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
    
});

<a href="https://test.instamojo.com/dhishna2020/workshop-2/" rel="im-checkout" data-text="Pay" data-css-style="color:#ffffff; background:#75c26a; width:300px; border-radius:4px"   data-layout="vertical"></a>
<script src="https://js.instamojo.com/v1/button.js"></script>