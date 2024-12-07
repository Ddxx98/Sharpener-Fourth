const express = require('express')
const bodyParser = require('body-parser')

const msg = require('./routes/msg')
const login = require('./routes/login')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/login',login)
app.use('/msg',msg)

app.use((req,res)=>{
    res.status(404).send('<h1>Page Not Found!!</h1>')
})

app.listen(3000,()=>{
    console.log("Server is running in 3000!!!")
})