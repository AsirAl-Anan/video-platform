const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateTokens')
const registerFunction = async (req , res) =>{
    try{
        const existedUserEmail = await userModel.findOne({email: req.body.email})
        if (req.body.fullname !== "" && req.body.email !== "" && req.body.password !== "") {
          if(!existedUserEmail){
            let { email, password, fullname } = req.body;
            bcrypt.genSalt(10, (err, salt)=>{
                if(err){
                    return res.status(500).send(err)
                } else{
                    bcrypt.hash(password, salt , async (err, hash)=>{
                        if(err){
                            return res.status(500).send(err)

                        } else {
                            let user = await userModel.create({
                                email,
                                password : hash,
                                fullname
                              });
                              const token = generateToken(user)
                             res.cookie('token', token)
                             res.redirect('/shop')
                        }
                    })
                }
            })

          } else {
              res.status(403).send('Email is already Registered')
          }
           

          } else{
              res.status(403).send('Complete all the form input filds')
          }
        

       
    }catch(e){
        console.log(e.message)
    }
}
const loginFunction = async (req, res) =>{
    const {email , password} = req.body
    const existedUser = await userModel.findOne({email})
    if(!existedUser){
       req.flash('Incorrect Email or Password')
    } else {
        bcrypt.compare(password , existedUser.password, (err, result)=>{
            if(err){
                return res.send(err)
            } else {
                let token = generateToken(existedUser)
                res.cookie("token", token)
                res.redirect('/shop')
            }
        })
    }
}
const logoutFunction = (req, res) =>{
res.cookie("token", "")
}
module.exports ={ registerFunction ,loginFunction, logoutFunction}