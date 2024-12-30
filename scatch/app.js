const express= require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const dotEnv = require("dotenv").config()
const expressSession = require('express-session')
const flash = require('connect-flash')
const indexRouter = require('./routes/index')
const req = require('express/lib/request')

 app.use(
     expressSession(
         {
             resave:false,
             saveUninitialized: false,
             secret: "hbjcsdhbc",
         }
     )
 )
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use('/', indexRouter)
app.use('/owners', ownersRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.listen(3000, ()=>{
    console.log('server is running in port 3000')
})