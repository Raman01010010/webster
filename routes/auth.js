const express=require('express')
const router=express()
const authController=require('../controllers/authController')
const loginLimiter=require('../middleware/loginLimiter')
router.post('/',loginLimiter,authController.handleLogin)
module.exports=router