const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Router = require('./routes')
dotenv.config()
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const ConnectDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_STR)
        console.log('DB Connected !')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
ConnectDB()
app.use('/',Router)
app.listen(8000,()=>{console.log('App is running @8000')})