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

Router.delete('/users/:id',async(req,res)=>{
    try{
        await user.findOneAndDelete({_id:req.params.id})
        const users = await user.find()
        res.json(users)
    }catch(err){
        res.json({Message:err.message}).status(400)
    }  
})
Router.put('/users/:id',async(req,res)=>{
    try{
        await user.findOneAndUpdate(
            {_id:req.params.id},
            {$set:{
                Name:req.body.Name,
                Age:req.body.Age,
                City:req.body.City
            }}
        )
        res.status(200).json({ message: "User updated successfully!" })
    }catch(err){
        res.json({Message:err.message})
    }
})
module.exports = Router