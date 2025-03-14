const express = require('express')
const Router = express.Router()
const user = require('./model')
Router.post('/users',async(req,res)=>{
    try{
        const newUser = await user.create({
            ID: req.body.ID,
            Name:req.body.Name,
            Age:req.body.Age,
            City:req.body.City
        })
        await newUser.save()
        res.json(newUser).status(201)
    }catch(err){
        res.json({Message:err.message}).status(400)
    }
})
Router.get('/users',async(req,res)=>{
    const users = await user.find()
    res.json(users)
})
module.exports = Router