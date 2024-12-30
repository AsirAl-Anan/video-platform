const express = require('express')
const app = express()



app.use(express.json)
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) =>{
 res.send('Champion mera anuj')
} )
app.get("/profile",
(req, res) =>{
    res.send('champion ujka coach ')

}
)
app.listen(3000)