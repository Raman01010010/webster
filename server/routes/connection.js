const express=require('express')
const router=express()

const connectionController = require('../controllers/connectionController')
router.post('/',connectionController.connection)

module.exports=router