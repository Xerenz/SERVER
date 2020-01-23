const Workshop = require("../models/ws.model");




// place your data here

var data = [
    
    // {
    //     name : "Machine learning",
    //     date : "18/1/2020 - 19/1/2020",
    //     price : "700",
    //     branch : "CS",
    //     content : "This is a two day workshop where you will learn the basics of ml. The session would be a hands on session perfect for beginners. Industry experts handpicked by iit Bombay would ensure an enlightening experience for the students. Furthermore it also provides an opportunity to enter a national level competition and win exciting prizes.",
    //     label : "coding",
    //     contact:[
    //                 { 
    //                     name:"Harsha Salim",
    //                     phone:"7902834880"
    //                 },

    //                 { 
    //                     name:"Aswathy R Ullas",
    //                     phone:"7902467340"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail image name
    //     details:"w_machine",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://test.instamojo.com/api/1.1/payment-requests/"	


    // },
    // {
    //     name : "Artificial Neural Network",
    //     date : "1/2/2020 - 2/2/2020",
    //     price : "1400",
    //     branch : "IT",
    //     content : "An insight to the computing systems that are vaguely inspired by the biological neural networks that constitute our brains. Get started with the Neural Network Toolbox, work on some of the brain patterns, explore computing through the various softwares like MATLAB and get acquainted with the world of fuzzy logics, neuron perceptrons, time series' functions etc. A journey through the neurons in our brain to the neurons in a computer. ",
    //     label : "coding",
    //     contact:[
    //                 { 
    //                     name:"Parvathi",
    //                     phone:"8287601553"
    //                 },

    //                 { 
    //                     name:"Rizwan",
    //                     phone:"7012806994"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_artificial",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://test.instamojo.com/api/1.1/payment-requests/"    


    // },
    // {
    //     name : "Advanced Fire fighting",
    //     date : "25/1/2020 - 12/1/2020",
    //     price : "1400",
    //     branch : "SAFETY",
    //     content : "The technology is all in steps of advancement.Every field experiencing it's touch and thus is the scenario in fire fighting too.The modern Fire fighting technology ,it's scope , effectiveness all being described and various existing advanced technologies being demonstrated in this workshop.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Leo",
    //                     phone:"8078367942"
    //                 },

    //                 { 
    //                     name:"Varun",
    //                     phone:"9497788454"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_humanoid",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://test.instamojo.com/api/1.1/payment-requests/"    


    // },
    // {
    //     name : "Ducati",
    //     date : "18/1/2020 ",
    //     price : "800",
    //     branch : "SAFETY",
    //     content : "Ducati is best known for high-performance motorcycles characterized by large-capacity four-stroke, 90° V-twin engines with a desmodromic valve design.Ducati has produced several styles of motorcycle engines, including varying the number of cylinders, type of valve actuation and fuel delivery.In this workshop on Ducati ,we offer a excellent opportunity to learn more about Ducati Motorcycles and the latest technologies used by them.When we say Ducati factory trained, it mean just that!!.So we also offer a rare opportunity to attend a service workshop with Ducati's Two brilliant bikes Multistrada 1260 and Ducati Scrambler.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Vishnu",
    //                     phone:"8075347346"
    //                 },

    //                 { 
    //                     name:"Binniyamin",
    //                     phone:"8547209886"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_ducati",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/workshop-on-ducati/"    


    // },
    // {
    //     name : "Mercedes Benz engine Diagnosis and overhauling",
    //     date : "25/1/2020  - 26/1/2020",
    //     price : "1400",
    //     branch : "SAFETY",
    //     content : "Mercedes-Benz  engine systems are all about performance without compromise, economic efficiency and sustainability. They set worldwide benchmarks for cars, trucks and buses. In addition drivers appreciate the driving dynamics, the high power at low engine speeds, the smooth running characteristic and its powerful engine brake. They are using innovation power to develop environmentally friendly powertrain components and are continuously improving their engines to further reduce fuel consumption and emissions.Dhishna inassociation with IIT Bombay brings you a great opportunity to learn more about Mercedes Benz Engine Design and Analysis . These professionals from Utkraanti will take you for a virtual ride covering all the aspects of the engine.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Namit",
    //                     phone:"7558057426"
    //                 },

    //                 { 
    //                     name:"Harikrishnan",
    //                     phone:"9074567385"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_mercedes",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/mercedes-benz-engine-diagnosis-and-overhauli/"


    // },
    // {
    //     name : "PCB designing",
    //     date : "18/1/2020 - 19/1/2020",
    //     price : "850",
    //     branch : "ec",
    //     content : "Ever tried opening the parts of your favourite remote controlled car while you were a child? Does electronic circuits attract you too?Dhishna in association with Innovians Technologies brings you a two day workshop teaching you to design a PCB board, to discover more about it and make use of it designing smarter systems... Remember the best part is certificate by Technex, IIT Varanasi to each participant.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Sharon",
    //                     phone:"7907101793"
    //                 },

    //                 { 
    //                     name:"Krishna",
    //                     phone:"8281865483"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_pcb",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/pcb-designing-39911/"


    // },
    // {
    //     name : "Fire Safety Robotics",
    //     date : "25/1/2020 - 26/1/2020",
    //     price : "1400",
    //     branch : "safety",
    //     content : "The technology is all in steps of advancement. Every field experiencing it's touch and thus is the scenario in fire fighting too.In the event of a fire breakout, to rescue people and to put out the fire  are forced to use human resources which are not safe. With the advancement of technology especially in Robotics it is very much possible to replace humans with robots for fighting the fire. Dhishna 2020 in association with IIT Bombay presents you a two day workshop on Fire Safety Robotics ",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Leo",
    //                     phone:"8078367942"
    //                 },

    //                 { 
    //                     name:"Varun",
    //                     phone:"9497788454"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_fire_robo",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/fire-safety-robotics/"


    // },
    // {
    //     name : "Artificial Neural Network",
    //     date : "1/2/2020 - 2/2/2020",
    //     price : "1400",
    //     branch : "it",
    //     content : "Neural networks are computing systems with interconnected nodes that work much like neurons in the human brain. Using algorithms, they can recognize hidden patterns and correlations in raw data, cluster and classify it, and – over time – continuously learn and improve.Dhishna 2020 in association with IIT Bombay presents you a two day workshop on Artificial Neural Networks. Moreover, certificate from IIT Bombay will be awarded to each participant.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Rizwan",
    //                     phone:"7012806994"
    //                 },

    //                 { 
    //                     name:"Parvathi",
    //                     phone:"8287601553"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_nueron",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/artificial-neural-network/"


    // },
    // {
    //     name : "Automobile  360",
    //     date : "1/2/2020 - 2/2/2020",
    //     price : "750",
    //     branch : "mec",
    //     content : "Automobiles have always been part of everyone’s life and they always will be. The roar of a great engine, the unity and uniqueness of an automobile’s engineering and coachwork, the history of the company and the car, and of course the sheer beauty of the thing .Dhishna 2020 presents you a great opportunity to study more about automobiles. Kits are provided that includes basic knowledge, calculations and methodologies for step by step designing.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Kevin",
    //                     phone:"9746558149"
    //                 },

    //                 { 
    //                     name:"Akshay",
    //                     phone:"9048123847"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_automobile",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/automobile-360/"

    // },
    // {
    //     name : "Astro Photography",
    //     date : "1/2/2020 - 2/2/2020",
    //     price : "1000",
    //     branch : "mec",
    //     content : "Fascination with the sun, moon, stars and the galaxies visible in the sky. The boundless curiosity about the universe and its origin. Questions about evolution and the possibility of extraterrestrial life. All this has led to quests for the methods and means to observe, capture and quantify the skies above.For all of you drawn to the magic of the night skies, Dhishna 2020 presents to you a golden opportunity! This session will give you a headstart into Astrophotography — a detailed, stellar way of photographing celestial areas of the night sky. Experience a stargazing session where you can mull over the sheer beauty of everything from the moon to the milky way, and better yet, capture it all on screen.",
    //     label : "technical",
    //     contact:[
    //                 { 
    //                     name:"Basil",
    //                     phone:"8304897110"
    //                 },

    //                 { 
    //                     name:"Aparna",
    //                     phone:"8921444192"
    //                 }
    //             ],
    //     message:" open now",
    //     isOpen:true,
    //     //full detail pdf name
    //     details:"w_astro",
    //     pdfUrl:"",
    //     // payment url
    //     url : "https://www.instamojo.com/dhishna2020/astro-photography/"

    // },
    /*   {
        name : "Bamboo and Mud Construction",
        date : "3/2/2020 - 4/2/2020",
        price : "1500",
        branch : "civil",
        content : "From mud we arose, and to it we shall return. Grass as well, in the case of construction. Our habitats have evolved into cold concrete cubicles, in the wake of progress. But now, we come back to more natural spaces that are both aesthetic and warm. Making use of naturally available materials, like bamboo and mud, we move forward into a future of eco - friendly houses that are cost - effective and at the same time sustainable. Dhishna 2020, in association with Habitat Tech Group TVM, brings you a two day workshop on Bamboo and Mud construction in which participants will work in groups to complete various projects involving real bamboo and mud.",
        label : "technical",
        contact:[
                    { 
                        name:"Sahal",
                        phone:"7902702089"
                    },

                    { 
                        name:"Sreejith",
                        phone:"8848766808"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_bamboo",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/bamboo-and-mud-construction/"

    },*/

    {
        name : "Tezlaa",
        date : "8/2/2020",
        price : "400",
        branch : "mec",
        content : "Matching the steps of the new trend of electric vehicles, Smado Labs Private Limited, a blooming start-up based in Maker Village, Kochi, has come up with its own foldable Electric Bike. Tezlaa is an e-bike designed by Smado Labs Private Limited. What makes Tezlaa unique is that it is the first foldable e-bike in India, making it convenient to carry wherever one travels. The combination of green energy and fitness makes it a fashion statement to flaunt. The eco-friendly bike is dustproof, rustproof and can be folded to be carried anywhere. Dhishna 2020 in association with team Tezlaa, presents you a technical workshop that could help young aspirants to discover the world’s best and coolest bicycle ever.",
        label : "technical",
        contact:[
                    { 
                        name:"Thejus",
                        phone:"8086023111"
                    },

                    { 
                        name:"Namit",
                        phone:"7558057426"
                    }
                ],
        message:" open now",
        isOpen:true,
        //full detail pdf name
        details:"w_tezlaa",
        pdfUrl:"",
        // payment url
        url : "https://www.instamojo.com/dhishna2020/tezlaa/"

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
    
    
    // Workshop.collection.drop();

    // save multiple documents to the collection referenced by  Model
    Workshop.collection.insert(data, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
    
});
