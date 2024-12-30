const express= require('express')
const router = express.Router()
const {registerFunction , loginFunction, logoutFunction} =  require('../controllers/authControllers')
router.get('/',(req, res)=>{
res.send("Hey")
})
router.post('/register', registerFunction)
router.post('/login', loginFunction)
router.get('/logout', logoutFunction)
module.exports = router