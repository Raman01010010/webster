const express=require('express')
const router=express()

const fetchingConnection = require('../controllers/fetchingConnection')
router.post('/',fetchingConnection.myconnection)

module.exports=router