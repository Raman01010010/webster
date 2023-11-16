const express=require('express')
const router=express()

const getprojectController = require('../controllers/getprojectController')
router.post('/',getprojectController.getproject)

module.exports=router