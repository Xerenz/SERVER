const Workshop = require("./models/ws.model");




// place your data here

var data = [
    
    {
        name : "Machine learning",
        date : "18/1/2020 - 19/1/2020",
        price : "700",
        branch : "CS",
        content : "This is a two day workshop where you will learn the basics of ml. The session would be a hands on session perfect for beginners. Industry experts handpicked by iit Bombay would ensure an enlightening experience for the students. Furthermore it also provides an opportunity to enter a national level competition and win exciting prizes.",
        label : "coding",
        contact:[
                    { 
                        name:"Harsha Salim",
                        phone:"7902834880"
                    },

                    { 
                        name:"Aswathy R Ullas",
                        phone:"7902467340"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_ml.pdf",
        // payment url
        url : "https://test.instamojo.com/api/1.1/payment-requests/"	


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
    
    
    Workshop.collection.drop();

    // save multiple documents to the collection referenced by  Model
    Workshop.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
    
});
