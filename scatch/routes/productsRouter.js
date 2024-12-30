const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel = require('../models/product')
router.get('/', (req, res) => {
    res.send("Hey")
})

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
        const product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
req.flash("success", "product created successfully")
res.redirect('/owners/admin')
    } catch(e){
        res.send(e)
    }
})
module.exports = router