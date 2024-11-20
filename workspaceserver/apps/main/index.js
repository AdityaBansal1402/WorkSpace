const express = require('express');
var cors = require('cors')
const app =express();
const port=5000 || process.env.PORT;
// app.get('/',(req,res)=>{
//     res.send();
// })
app.use(cors())
app.use(express.json())
app.listen(port, ()=>{
    console.log(`listening`);
})