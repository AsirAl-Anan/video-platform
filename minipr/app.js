const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const postModel = require('./models/post')
const path = require('path')
const pfpUpload = require('./utils/pfpMulter')
const postUpload = require('./utils/postMulter')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

const skey = 'SECRET_KEY'

app.get('/', (req, res)=>{
    res.render('index')
})
app.use('/posts', express.static(path.join(__dirname,'public/posts')))

app.post('/register',pfpUpload.single('image'), async (req, res)=>{
    let image 
    if(req.file !== undefined){
        image = req.file.filename
    } else {
        image = "default.png"
    }
    console.log(req.file)
    console.log("img ",image)
    const {name, username, age, email, password } = req.body
   
    let user_exists = await userModel.findOne({email})
    let user_name_exists = await userModel.findOne({username})
   

    if(user_exists){
        return res.status(500).render('Email Already registered')
    }else if(user_name_exists)
    {   

        return res.status(500).render('Username Already exists')

    } else {
        bcrypt.genSalt(10, (err, salt)=>{
            if(err){
           

              return  res.status(300).send("Account creation failed")
            } else {
          

                bcrypt.hash(password, salt , async (err, hash)=>{
                    if(err){
      

                        return res.status(300).send("Account creation failed")

                    } else {
                      
                       let user =  await userModel.create({
                            name,
                            username,
                            email,
                            age,
                            image,
                            password: hash
                        })
                        const token = jwt.sign({email}, skey)

                        res.cookie('token', token)
                        res.redirect('/posts')
                    }
                })
            }
        })
    }
})
app.get('/logout', (req,res)=>{
    res.cookie('token', "")
    res.redirect('/')
})
app.get('/post/like/:pid', async (req, res)=>{
    const pid = req.params.pid
    const post  = await postModel.findOne({_id: pid})
    const token = req.cookies.token
    const userEmail = jwt.verify(token , skey).email 
    const user = await userModel.findOne({email: userEmail})
    const likes = post.likes

 const alreadyLiked = likes.includes(user._id)

    if(alreadyLiked){
        post.likes.splice(user._id, 1)
        post.save()
        res.redirect('/posts')
    } else{
    user.liked.push(post._id.toString())
     user.save()
    
    post.likes.push(user._id.toString())
    post.save()
    res.redirect('/posts')
    }
    
})
app.get('/posts',async (req, res)=>{
    const token = req.cookies.token
    if(!token ){
        console.log('No cookie')
    return    res.redirect('/')

    } else{
        const decodedUser = jwt.verify(token ,skey)
        const loggedInUserEmail = decodedUser.email
        
        const posts = await postModel.find()
        const users = await userModel.find()
        const loggedInUser = await userModel.findOne({email: loggedInUserEmail})
        function isLiked(post){
          const   likes = post.likes || []
            
            if(likes.includes(loggedInUser._id.toString())){
                 return true
             } else {
                 return false
             }
            
        }
        function ifOwner(post){
            const postUser = post.user.toString()
            if(postUser !== loggedInUser._id.toString()){
                return false
            } else {
                return true
            }
        }
        
        res.render('post', {posts, users, isLiked, loggedInUser, ifOwner})



    }
   
    
})

app.post('/create/post',postUpload.single('image'),  async (req, res)=>{
 const {title, description} = req.body
const image = req.file.filename
 let userId = ''

 if(!req.cookies.token){
    return res.redirect('/')
    
 }
 
 const decodedUser = jwt.verify(req.cookies.token ,skey)
        const loggedInUserEmail = decodedUser.email
        
        const user = await userModel.findOne({email: loggedInUserEmail})
        userId = user._id.toString()
        const username = user.username
        const userImage = user.image
      const post = await postModel.create({
          title, 
          description,
          image,
          user: userId,
          time: Date.now(),
          username,
          userImage

      })
      const postId = post._id.toString()
       user.post.push(postId)
      await user.save()
        
       res.redirect(`/post/${postId}`) //dynamic route start

     

})

app.get('/users/:username/:userid',async (req, res)=>{
    const username = req.params.username
    const  userid = req.params.userid

    const user = await userModel.findOne({username})
    console.log(user)
    const userPostsId = user?.post
    
    const posts = await Promise.all(
        userPostsId.map( async (id)=>{
            const idStr = id.toString()
              const post=  await postModel.findOne({_id:idStr})
              return post
            })
    )  

    res.render('profile', {user,posts})

})


app.get('/post/:postId',async (req ,res)=>{ //dynamic route declared
   const postId = req.params.postId

   if(!req.cookies.token){
       return ('/')
   }
   const post = await postModel.findOne({_id: postId})
 console.log(post)
   const userId = post.user
   const user = await userModel.findOne({_id:userId})
   const decodedUserEmail = jwt.verify(req.cookies.token, skey).email
   const loggedInUser = await userModel.findOne({email: decodedUserEmail})
   function isLiked(){
    const   likes = post.likes || []
      
      if(likes.includes(loggedInUser._id.toString())){
           return true
       } else {
           return false
       }
      
  }
    res.render('singlepost' , {post, user , isLiked })
})

app.get('/login',  (req, res)=>{
    res.render('login')
})
app.post('/user/login',async (req,res)=>{
    const {email, password } = req.body
    const user = await userModel.findOne({email })

    
    if(!user){
        res.send('User does not exist')
        
    } else {
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                res.status(500).send(err)
            } else {
                const token = jwt.sign({email}, skey)
                res.cookie('token', token)
                return res.redirect('/posts')
            }
        });
    }
})
app.listen(3000, ()=>{
    console.log('server is running')
})