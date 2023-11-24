const express=require('express')
const router=express()
const logout=require('../controllers/logoutController')
router.post('/logout',logout.logout)
module.exports=router;