const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name :String,
    email: String,
    price: Number,
    bgcolor: String,
    panelcolor: String,
    discount: {
        type: Number,
        default: 0
    },
    image: Buffer
})

module.exports = mongoose.model('product', productSchema)