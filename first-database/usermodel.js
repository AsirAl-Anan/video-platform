const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/mongo`).then(console.log('mongo server is runningcd ')).catch((e)=> console.log(e))

const userSchema = mongoose.Schema(
{
  name: String,
  age: Number,
  email: String
})



module.exports = mongoose.model("user" , userSchema)