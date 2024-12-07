const express = require('express')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const login = express.Router()

login.get("/",(req,res)=>{
    res.send('<form action="/login" method="POST"><label>Username:<input type="text" name="username"></label><button type="submit">Login</button></form>')
})

login.post("/",(req,res)=>{
    console.log(req.body.username)
    localStorage.setItem("username",req.body.username)
    res.redirect("/msg")
})

module.exports = login