const express=require('express')
const router=express()

const particularjobController = require('../controllers/particularjobController')
router.post('/',particularjobController.particularjob)

module.exports=router
