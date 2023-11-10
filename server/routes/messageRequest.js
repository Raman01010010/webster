const express=require('express')
const router=express()

const sendMessagerequestController = require('../controllers/acceptMessageController')
router.post('/',sendMessagerequestController.sendMessagerequest)

module.exports=router