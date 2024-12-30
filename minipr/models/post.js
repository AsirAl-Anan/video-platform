const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title : String,
    description : String,
    image : String,
    time : {
        type : Date,
        default: Date.now()
    },
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        
    },
    userImage:{
        type: String
    },
    likes: [
    {    type: mongoose.Schema.Types.ObjectId,
        ref: 'user'}
    ]
})


module.exports =  mongoose.model('post', postSchema)