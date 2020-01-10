const express = require('express');
const mongoose = require('mongoose');
var promise = require('promise');


// =====================================================

mongoose.connect("mongodb://localhost/dhishna",{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


const app = express();



app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));

app.set("view engine", "ejs");


// =====================================================
cyberSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "phone": String,
        "isAttended": String,
        "isSpot": String


    })

var Cyber = mongoose.model('cyber_workshop', cyberSchema);

// =====================================================


// =====================================================

app.get('/',(req,res) =>{
	res.send("admin dash is running in another port");
})

app.get('/handle/cyber/view',(req,res)=>{

	Cyber.find({}).then((data)=>{
        res.render("attendee/attend_view.ejs",{data:data})
    })

})

app.get('/handle/cyber/scan',(req,res)=>{
    res.render("cyber")
})

app.get('/handle/cyber/')

app.listen(3000)