const express=require('express')
const router=express()
const registerController=require('../controllers/registerController')
const videoController=require('../controllers/videoController')

router.post('/call',videoController.call)

router.post('/otp',registerController.handleNewUser)
module.exports=router