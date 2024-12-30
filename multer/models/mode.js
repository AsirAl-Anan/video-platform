const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/myapp')

const modelSchema = mongoose.Schema({
    profilepic: {
        type: String,
        default: "images/default.png"
    }
})
module.exports = mongoose.model("model", modelSchema)