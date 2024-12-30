const mongoose = require('mongoose')
const config = require('config')

const dbgr = require('debug')('development:mongoose')
mongoose.connect(`${config.get('MONGODB_URI')}/scatch`).then(()=> console.log("Mongodb server is running")).catch((e)=> console.log("mongo db server error: ", e))

module.exports = mongoose.connection