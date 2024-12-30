const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())



app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index')
})
app.post('/create', (req, res) => {
    const { username, age, email, password } = req.body

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return (err)
        bcrypt.hash(password, salt, async (err, hash) => {

         let user=    await userModel.create({
                username,
                age,
                email,
                password : hash
            })
          let token =  jwt.sign({email}, "abcd")
            res.cookie("token", token)
           res.send(user) 
        })
    })

})
app.get('/logout', (req, res)=>{
    res.cookie('token',"")
    res.redirect('/')
})
app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/loginuser', async (req, res)=>{
    const {password , email} = req.body
   
    const user =await userModel.findOne({email})
    const hash = user.password
    console.log(password ,hash)
    bcrypt.compare(password , hash , (err, result)=>{
        if(err){
            console.log(err)

            res.redirect('/login')
        } else {
            res.cookie('token','')
            let token = jwt.sign({email}, "email")
            res.cookie('token', token)
            res.render('users', {msg:"logged in"})
        }
    })
})
app.listen(3000)