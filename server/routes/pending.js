const express=require('express')
const router=express()

const pendingController = require('../controllers/pendingController')
router.post('/',pendingController.pending)

module.exports=router