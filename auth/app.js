const express = require('express')

const app = express()
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(cookieParser())



app.get('/', (req, res)=>{
 let token =   jwt.sign({email: "harsh@email.com"}, "secret")
 res.cookie('token', token)
    res.send('working')
})
app.get('/read', (req, res)=>{
    console.log(req.cookies.token)
    res.send('read')
})


app.listen(3000, (e)=>{
    console.log('server running')
})