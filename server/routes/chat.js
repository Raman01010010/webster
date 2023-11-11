const express=require('express')
const router=express()
const chatController=require('../controllers/chatController')
const loginLimiter=require('../middleware/loginLimiter')
router.post('/',chatController.get)
module.exports=router