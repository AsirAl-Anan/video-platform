const express = require('express')
const router= express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const productModel = require('../models/product')

router.get('/',(req,res)=>{
    let error = req.flash('error')
    res.render('index', {error})
})
router.get('/shop', isLoggedIn,async (req, res)=>{
    const products = await productModel.find()
    res.render('shop',{products})
})


module.exports = router