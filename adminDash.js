const express = require('express');
const mongoose = require('mongoose');
const promise = require('promise');
const bodyParser = require("body-parser");


// =====================================================

mongoose.connect("mongodb://localhost/dhishna",{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


const app = express();


app.use(bodyParser.urlencoded({extended : false}));
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

app.get('/handle/cyber/:id/change',(req,res)=>{

    Cyber.findById(req.params.id).then((data)=>{

        if(data.isAttended == "false")
        {
             data.isAttended = "true"
        }
        
        data.save((err,data)=>{
            if(err)
            {
                console.log("error in saving")
            }
            else
            {
                res.redirect('/handle/cyber/view')
            }
        })


    })

})

app.get('/handle/cyber/scan',(req,res)=>{
    res.render("attendee/cyber",{message:""})
})


app.get('/handle/cyber/:phone/mark',(req,res)=>{
    
    var phone_ = req.params.phone
    console.log(phone_)
   
    Cyber.findOne({"phone":phone_}).then((data)=>{
        if(data)
        {

            console.log(data)
            data.isAttended = "true"
            data.save((err,found)=>{
                if(err)
                {
                    res.render('attendee/cyber',{message:"Error in scaning"})
                }
                else
                {
                    res.redirect('/handle/cyber/view')
                }
            }) 
        }
        else
        {
            res.render('attendee/cyber',{message:"Person not found"})
        }
        
    })


})

app.get('/handle/cyber/new',(req,res)=>{
    res.render("attendee/newCyber")
})


app.post('/handle/cyber/new',(req,res)=>{

   

    cyber = new Cyber({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAttended:"true",
        isSpot: req.body.isSpot
    })


    cyber.save((err,data)=>{
        if(err)
        {
            res.redirect('/handle/cyber/new')
        }
        else
        {
            res.redirect('/handle/cyber/view')
        }
    })
})


app.listen(3000)