const express = require('express')
const app = express()
const path = require('path')
const multerConfig = require('./utils/multer')
const model = require('./models/mode')
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))




app.set('view engine', "ejs")
app.get('/',async (req, res)=>{
const users =await model.find()
res.render('index',{users}) 

})
app.post('/upload', multerConfig.single('image'), async (req, res)=>{
    const uploadedFile = req.file
    const newPic = await model.create({
        profilepic: uploadedFile.filename
    })
    console.log(newPic, uploadedFile)
    res.redirect('/')

})
app.listen(8000,()=>{
    console.log('Server is running')
})