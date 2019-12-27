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
        //full detail image name
        details:"w_ducati",
        pdfUrl:"",
        // payment url
        url : "https://test.instamojo.com/api/1.1/payment-requests/"	


    },
    {
        name : "Artificial Neural Network",
        date : "1/2/2020 - 2/2/2020",
        price : "1400",
        branch : "IT",
        content : "An insight to the computing systems that are vaguely inspired by the biological neural networks that constitute our brains. Get started with the Neural Network Toolbox, work on some of the brain patterns, explore computing through the various softwares like MATLAB and get acquainted with the world of fuzzy logics, neuron perceptrons, time series' functions etc. A journey through the neurons in our brain to the neurons in a computer. ",
        label : "coding",
        contact:[
                    { 
                        name:"Parvathi",
                        phone:"8287601553"
                    },

                    { 
                        name:"Rizwan",
                        phone:"7012806994"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_humanoid",
        pdfUrl:"",
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
