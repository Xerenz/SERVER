const Workshop = require("../models/ws.model");




// place your data here

var data = [
    
   
    {
        name : "Humanoid Robot",
        date : "11/1/2020 - 12/1/2020",
        price : "1400",
        branch : "EC",
        content : "A 2-day workshop exploring the approaches to design , create and optimize technology's favourite child of the future - Humanoid Robots. After this workshop, participants will have the fundamentals to keep up to date with the latest advancements in the field and have a broad knowledge of the wide range of applications it presents.",
        label : "technical",
        contact:[
                    { 
                        name:"Sanjith Sadan ",
                        phone:"8111948462"
                    },

                    { 
                        name:"Naveen",
                        phone:"8113054081"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_humanoid",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/humanoid-robot/"


    },
   
    {
        name : "Ducati",
        date : "18/1/2020 ",
        price : "800",
        branch : "SAFETY",
        content : "Ducati is best known for high-performance motorcycles characterized by large-capacity four-stroke, 90° V-twin engines with a desmodromic valve design.Ducati has produced several styles of motorcycle engines, including varying the number of cylinders, type of valve actuation and fuel delivery.In this workshop on Ducati ,we offer a excellent opportunity to learn more about Ducati Motorcycles and the latest technologies used by them.When we say Ducati factory trained, it mean just that!!.So we also offer a rare opportunity to attend a service workshop with Ducati's Two brilliant bikes Multistrada 1260 and Ducati Scrambler.",
        label : "technical",
        contact:[
                    { 
                        name:"Vishnu",
                        phone:"8075347346"
                    },

                    { 
                        name:"Binniyamin",
                        phone:"8547209886"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_ducati",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/workshop-on-ducati/"    


    },
    {
        name : "Mercedes Benz engine Diagnosis and overhauling",
        date : "25/1/2020  - 26/1/2020",
        price : "1400",
        branch : "SAFETY",
        content : "Mercedes-Benz  engine systems are all about performance without compromise, economic efficiency and sustainability. They set worldwide benchmarks for cars, trucks and buses. In addition drivers appreciate the driving dynamics, the high power at low engine speeds, the smooth running characteristic and its powerful engine brake. They are using innovation power to develop environmentally friendly powertrain components and are continuously improving their engines to further reduce fuel consumption and emissions.Dhishna inassociation with IIT Bombay brings you a great opportunity to learn more about Mercedes Benz Engine Design and Analysis . These professionals from Utkraanti will take you for a virtual ride covering all the aspects of the engine.",
        label : "technical",
        contact:[
                    { 
                        name:"Namit",
                        phone:"7558057426"
                    },

                    { 
                        name:"Harikrishnan",
                        phone:"9074567385"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_mercedes",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/mercedes-benz-engine-diagnosis-and-overhauli/"


    },
    {
        name : "Cyber Warfare",
        date : "11/1/2020",
        price : "500",
        branch : "CS",
        content : "Cyberwarfare could turn every gadget you own into a weapon on a virtual battlefield. And the damage will be felt in the real world.To date, there hasn't been an outright 'cyber war' with declared antagonists, however, there are a number of incidents that have caused serious disruption to country's infrastructure that are suspected of being carried out by another state.Future wars will see hackers using computer code to attack an enemy's infrastructure, fighting alongside troops using conventional weapons like guns and missiles.  Dhishna'20 presents you a one day workshop on Cyberwarfare with certificate to each participant.",
        label : "technical",
        contact:[
                    { 
                        name:"Ebin Santy ",
                        phone:"9495476775"
                    },

                    { 
                        name:"Vinay",
                        phone:"9074468705"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_cyber",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/cyber-warfare/"


    },
    {
        name : "PCB designing",
        date : "18/1/2020 - 19/1/2020",
        price : "850",
        branch : "ec",
        content : "Ever tried opening the parts of your favourite remote controlled car while you were a child? Does electronic circuits attract you too?Dhishna in association with Innovians Technologies brings you a two day workshop teaching you to design a PCB board, to discover more about it and make use of it designing smarter systems... Remember the best part is certificate by Technex, IIT Varanasi to each participant.",
        label : "technical",
        contact:[
                    { 
                        name:"Sharon",
                        phone:"7907101793"
                    },

                    { 
                        name:"Krishna",
                        phone:"8281865483"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_pcb",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/pcb-designing-39911/"


    },
    {
        name : "Fire Safety Robotics",
        date : "25/1/2020 - 26/1/2020",
        price : "1400",
        branch : "safety",
        content : "The technology is all in steps of advancement. Every field experiencing it's touch and thus is the scenario in fire fighting too.In the event of a fire breakout, to rescue people and to put out the fire  are forced to use human resources which are not safe. With the advancement of technology especially in Robotics it is very much possible to replace humans with robots for fighting the fire. Dhishna 2020 in association with IIT Bombay presents you a two day workshop on Fire Safety Robotics ",
        label : "technical",
        contact:[
                    { 
                        name:"Leo",
                        phone:"8078367942"
                    },

                    { 
                        name:"Varun",
                        phone:"9497788454"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_fire_robo",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/fire-safety-robotics/"


    },
    {
        name : "Artificial Neural Network",
        date : "1/2/2020 - 2/2/2020",
        price : "1400",
        branch : "it",
        content : "Neural networks are computing systems with interconnected nodes that work much like neurons in the human brain. Using algorithms, they can recognize hidden patterns and correlations in raw data, cluster and classify it, and – over time – continuously learn and improve.Dhishna 2020 in association with IIT Bombay presents you a two day workshop on Artificial Neural Networks. Moreover, certificate from IIT Bombay will be awarded to each participant.",
        label : "technical",
        contact:[
                    { 
                        name:"Rizwan",
                        phone:"7012806994"
                    },

                    { 
                        name:"Parvathi",
                        phone:"8287601553"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_nueron",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/artificial-neural-network/"


    },
    {
        name : "Automobile  360",
        date : "1/2/2020 - 2/2/2020",
        price : "600",
        branch : "mec",
        content : "Automobiles have always been part of everyone’s life and they always will be. The roar of a great engine, the unity and uniqueness of an automobile’s engineering and coachwork, the history of the company and the car, and of course the sheer beauty of the thing .Dhishna 2020 presents you a great opportunity to study more about automobiles. Kits are provided that includes basic knowledge, calculations and methodologies for step by step designing.",
        label : "technical",
        contact:[
                    { 
                        name:"Kevin",
                        phone:"8304897110"
                    },

                    { 
                        name:"Akshay",
                        phone:"8921444192"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_automobile",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/automobile-360/"


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
