const multer = require('multer')
const crypto = require('crypto')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("inside dest")
      cb(null, 'public/posts')
    },
    filename: function (req, file, cb) {

     crypto.randomBytes(12, (err, bytes)=>{
        console.log("inside crypt")


         const fn = bytes.toString('hex') + path.extname(file.originalname)
         console.log(fn)
         cb(null, fn)

     })
    }
  })


  const upload = multer({ storage: storage })
console.log("u:",upload)
  module.exports = upload