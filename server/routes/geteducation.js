const express=require('express')
const router=express()

const geteducationController = require('../controllers/geteducationController')
router.post('/',geteducationController.getEducation)

module.exports=router