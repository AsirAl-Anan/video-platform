const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
//disk storage setup
//export upload variable
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads')
    },
  

    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes)=>{
            if(err){
                return console.log(err)
            } else {
                const fn = bytes.toString('hex') + path.extname(file.originalname)
                cb(null, fn)
            }
        })

     
    }
  })
  const uploads = multer({storage: storage})
  module.exports = uploads