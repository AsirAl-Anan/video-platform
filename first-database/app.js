const express = require('express')
const app = express()
const userModel = require('./usermodel')
 app.get('/', (req, res)=>{
   res.send('Hiiiiii')
 })

app.get('/create', async (req, res)=>{
let createdUser =  await userModel.create(
   {
      name: "anan",
      age: 17,
      email: "a@gmail.com"
   })

res.send(createdUser)
})


app.get('/update', async (req, res)=>{
  let user =  await userModel.findOneAndUpdate({name: "anan"}, {age: 18},{ new: true})
  res.send(user)
})
app.get('/read', async (req, res)=>{

let users  = await userModel.find()
res.send(users)


})
app.get("/delete" , async (req, res)=>{
  let dlt = await userModel.findOneAndDelete({age: 18})
  res.send(dlt)
})

 app.listen('3000', ()=>{
   console.log('The server is running on port 3000')
 })