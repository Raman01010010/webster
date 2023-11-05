const express=require('express')
const router=express()
const profileController=require('../controllers/profileController')
router.post('/',profileController.naukari)
//router.post('/get',saveController.getAll)
module.exports=router
