const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    ID:Number,
    Name:String,
    Age:Number,
    City:String
})

const userModel = mongoose.model('Users',userSchema)

module.exports = userModel