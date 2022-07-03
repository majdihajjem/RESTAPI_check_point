require('dotenv').config({ path: "./configuration/.env" });
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require("./models/User");
const router=express.Router();
//parse data 
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    err ? console.log(err):console.log("database is already connected")
}); 
app.listen(process.env.PORT,(err) => {
    err ? console.log(err) :console.log("server is running on port " + process.env.PORT)
})
//get all data 
router.get('/', (req, res)=>{
    User.find({},(err,data)=>{
        err?console.log(err):res.json(data);
    })
})
//add new user with @post methode
router.post('/newUser', (req, res)=>{
    let newUser= new User(req.body)
    newUser.save((err,data)=>{
        err?console.log(err):res.send('user was added')
    })
})
//PUT : EDIT A USER BY ID
router.put('/update/:id',(req, res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,msg)=>{
        err?console.log(err):res.json({msg:'user was updated'})
    })
})
//DELETE : REMOVE A USER BY ID
router.delete('/delete/:id',(req, res)=>{
    User.findByIdAndDelete({_id:req.params.id},(err,msg)=>{
        err?console.log(err):res.json({msg:'user was deleted'})
    })
})