const express = require('express');
const mongoose = require('mongoose');


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

var TransactionSchema = new mongoose.Schema(
    {
        payment_id : {type: String},
        payment_for : {type : String},
        status : {type: String},
        buyer : {type: String},
        uid : {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }
);


var Transaction = mongoose.model("Transaction",TransactionSchema);


// =====================================================



// =====================================================

app.get('/',(req,res) =>{
	res.send("admin dash is running in another port");
})

app.get('/workshop',(req,res)=>{

	Transaction.find({}).sort({payment_for : -1},function(err,data){
		console.log(data)
	})

})

app.get('/handle/cyber',(req,res)=>{
    res.render("cyber")
})

app.listen(3000)