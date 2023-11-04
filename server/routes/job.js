const express=require('express')
const router=express()
const jobController=require('../controllers/jobController')
router.post('/',jobController.create)
//router.post('/get',saveController.getAll)
module.exports=router