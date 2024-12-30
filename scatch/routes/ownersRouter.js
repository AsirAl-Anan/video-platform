const express= require('express')
const router = express.Router()
const ownerModel = require('../models/owners')


router.get('/',(req, res)=>{
    console.log(process.env.NODE_ENV)
res.render("admin")
})

if(process.env.NODE_ENV === "development"){
    router.post("/create",async (req,res) =>{
        const owners = ownerModel.find()
        if(owners.length > 0){
            res.status(500).send("You dont have permission to create owner")
        }
        let {fullname,email, password} = req.body
      const createdOwner =  await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner)
    })
}
router.get('/admin', (req,res)=>{
    let success = req.flash('success')

    res.render('createproducts.ejs', {success})
})


module.exports = router