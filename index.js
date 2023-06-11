const express=require('express')
const app=express()

require('dotenv').config()

app.listen(process.env.port,()=>{
    console.log("Serer running at port ",process.env.port)
})
const dbconnectFN=require('./config/database')
dbconnectFN()
const routes=require('./routes/router')
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json())

app.use("/api/v1",routes)