const express = require('express');
import client from "@repo/db/client"

var cors = require('cors')
const app =express();
const port=5000 || process.env.PORT;
app.get('/',(req,res)=>{
    res.send("hello");
})
app.use(cors())
app.use(express.json())
app.use('/api/main',require('./routes/Main/main'))
app.listen(port, ()=>{
    console.log(`listening`);
})