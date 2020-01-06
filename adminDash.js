const express = require('express');

const app = express();

app.get('/',(req,res) =>{
	res.send("admin dash is running in another port");
})


app.listen(3000)