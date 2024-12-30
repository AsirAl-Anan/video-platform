const exress = require('express')
const app = exress()
const postModel = require('./models/post')
const userModel = require('./models/user')

app.get('/', (req, res)=>{
    res.send('hiiiii')
})

app.get('/create', async (req, res)=>{
let user = await userModel.create({
    name: "Someone",
    age: 20,
    email: "someone@gmail.com"

 })
res.send(user)
})


app.get('/post/create',async (req, res)=>{
   const post = await postModel.create({
        postdata: 'Kaise hoooo',
        user:'6768006e373d3c9ddb543b29'
    })
   let  user = await  userModel.findOne({_id:"6768006e373d3c9ddb543b29"})
   user.posts.push(post._id)
   await user.save()
   res.send({post, user})
})
app.listen(8000,()=>{
    console.log('server is running')
})