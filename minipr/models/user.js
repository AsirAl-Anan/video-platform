const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/social').then( ()=> console.log('mongodb server is running'))

const userSchema = mongoose.Schema({
    image : {
        type: String,
        default:"default.png"
    },
    
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
        }],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    likedPosts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
})

module.exports = mongoose.model('user' , userSchema)