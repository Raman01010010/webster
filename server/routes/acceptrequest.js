const express=require('express')
const router=express()

const acceptrequestController = require('../controllers/acceptrequestController')
router.post('/',acceptrequestController.acceptrequest)

module.exports=router