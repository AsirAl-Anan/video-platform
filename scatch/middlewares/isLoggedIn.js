const userModel = require('../models/user')
const jwt = require('jsonwebtoken')


const isLoggedIn = async (req, res, next) =>{
    if(!req.cookies.token){
        console.log(!req.cookies.token)
        req.flash('You need to login first')
        res.redirect('/')
    }
    try {
        const decodedUserEmail = jwt.verify(req.cookies.token , process.env.JWT_KEY).email
        const user = await userModel.findOne({email: decodedUserEmail}).select("-password")
        req.user = user
        next()
    } catch(e) {
        req.flash(e.message)
        res.redirect('/')
    }
    
}

module.exports = isLoggedIn