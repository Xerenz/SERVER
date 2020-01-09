const express = require('express');
const mongoose = require('mongoose');




mongoose.connect("mongodb://localhost/dhishna",{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


const app = express();


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

app.get('/',(req,res) =>{
	res.send("admin dash is running in another port");
})

app.get('/workshop',(req,res)=>{

	Transaction.find({}).sort({payment_for : -1},function(err,data){
		console.log(data)
	})

})

app.listen(3000)