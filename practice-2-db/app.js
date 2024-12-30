const express = require('express')
const app = express()
const userModel = require('./model/user')
console.log(userModel)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/create',async (req, res)=>{
  const  {name, email, country, image , age} = req.body
  const user = await userModel.create({name, age, country, email, image})
  
  res.redirect('read')
})
app.get('/read', async (req, res)=>{


    const users = await userModel.find()
    res.render('read', {users})
})
app.get('/delete/:id', async (req, res)=>{
    const id = req.params.id

   await userModel.findOneAndDelete({_id: id})
   res.redirect('/read')
} )
app.get('/update/:id', async (req, res)=>{
    const currentUser =await userModel.findOne({_id:req.params.id})
    res.render('update',{user: currentUser})
})
app.post('/updateuser/:id', async (req, res)=>{
    const id = req.params.id
    const {name, email, age, country, image} = req.body
 const user =await userModel.findByIdAndUpdate({_id:id}, {name, email, age, country, image})
     res.redirect('/read')
})
app.listen(3000 ,()=>{
    console.log('ejs server running')
})