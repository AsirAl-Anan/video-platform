const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/myapp').then(console.log("mongodb server is running")).catch((e)=> console(e))

const userSchema = mongoose.Schema({
    name: String,
    age: String,
    country: String,
    email: String,
    image: String
})

module.exports = mongoose.model("user", userSchema)