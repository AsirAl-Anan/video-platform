const express = require('express')
const app = express()
const path = require('path')
const userModel = require("./models/user")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')



app.get('/', (req, res)=>{
	res.render('index')
})
app.get('/read',async (req, res)=>{
 let users = await userModel.find()

	res.render('read', {users})
})
app.post('/create' , async (req, res)=>{

	const {name , email , image} = req.body
const createdUser = await userModel.create({
name, image, email

}) 

res.redirect('/read')
})

app.get('/delete/:id', async (req, res)=>{
	const id = req.params.id
	const deleteUser =await userModel.findOneAndDelete({_id:id})
	res.redirect('/read')
})
app.listen(3000)